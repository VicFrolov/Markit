//
//  AutoCompleteTextField.swift
//  Markit
//
//  Created by Trixie on 11/30/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class AutoCompleteTextField: UITextField {

    /// Manages the instance of tableview
    var autoCompleteTableView: UITableView?
    /// Holds the collection of attributed strings
    lazy var attributedAutoCompleteStrings = [NSAttributedString]()
    /// Handles user selection action on autocomplete table view
    var onSelect: (String, NSIndexPath) -> () = {_ ,_ in}
    /// Handles textfield's textchanged
    var onTextChange: (String)->() = {_ in}
    
    /// Font for the text suggestions
    var autoCompleteTextFont = UIFont.systemFont(ofSize: 12)
    /// Color of the text suggestions
    var autoCompleteTextColor = UIColor.black
    /// Used to set the height of cell for each suggestions
    var autoCompleteCellHeight: CGFloat = 44.0
    /// The maximum visible suggestion
    var maximumAutoCompleteCount = 3
    /// Used to set your own preferred separator inset
    var autoCompleteSeparatorInset = UIEdgeInsets.zero
    /// Shows autocomplete text with formatting
    var enableAttributedText = false
    /// User Defined Attributes
    var autoCompleteAttributes: [String:AnyObject]?
    /// Hides autocomplete tableview after selecting a suggestion
    var hidesWhenSelected = true
    /// Hides autocomplete tableview when the textfield is empty
     var hidesWhenEmpty: Bool? {
        didSet {
            assert(hidesWhenEmpty != nil, "hideWhenEmpty cannot be set to nil")
            autoCompleteTableView?.isHidden = hidesWhenEmpty!
        }
    }
    /// The table view height
    public var autoCompleteTableHeight: CGFloat? {
        didSet {
            redrawTable()
        }
    }
    /// The strings to be shown on as suggestions, setting the value of this automatically reload the tableview
    public var autoCompleteStrings: [String]? {
        didSet{ reload() }
    }
    
    
    //MARK: - Init
    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
//        setupAutocompleteTable(view: superview!)
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        commonInit()
        setupAutocompleteTable(view: superview!)
    }
    
    override func willMove(toSuperview newSuperview: UIView?) {
        super.willMove(toSuperview: newSuperview)
        commonInit()
        if let superview = newSuperview {
            setupAutocompleteTable(view: superview)
        }
    }
    
    func commonInit() {
        hidesWhenEmpty = true
        autoCompleteAttributes = [NSForegroundColorAttributeName:UIColor.black]
        autoCompleteAttributes![NSFontAttributeName] = UIFont.boldSystemFont(ofSize: 12)
        self.clearButtonMode = .always
        self.addTarget(self, action: #selector(AutoCompleteTextField.textFieldDidChange), for: .editingChanged)
        self.addTarget(self, action: #selector(AutoCompleteTextField.textFieldDidEndEditing), for: .editingDidEnd)
    }
    
    func setupAutocompleteTable(view: UIView) {
        let screenSize = UIScreen.main.bounds.size
        let tableView = UITableView(frame: CGRect(x: self.frame.origin.x, y: self.frame.origin.y + self.frame.height, width: screenSize.width - (self.frame.origin.x * 2), height: 30.0))
        tableView.dataSource = self
        tableView.delegate = self
        tableView.rowHeight = autoCompleteCellHeight
        tableView.isHidden = hidesWhenEmpty ?? true
        view.addSubview(tableView)
        autoCompleteTableView = tableView
        
        autoCompleteTableHeight = 100.0
    }
    
    func redrawTable(){
        if let autoCompleteTableView = autoCompleteTableView, let autoCompleteTableHeight = autoCompleteTableHeight {
            var newFrame = autoCompleteTableView.frame
            newFrame.size.height = autoCompleteTableHeight
            autoCompleteTableView.frame = newFrame
        }
    }
    
    func reload(){
        if enableAttributedText{
            let attrs = [NSForegroundColorAttributeName:autoCompleteTextColor, NSFontAttributeName:autoCompleteTextFont] as [String : Any]
            
            if attributedAutoCompleteStrings.count > 0 {
                attributedAutoCompleteStrings.removeAll(keepingCapacity: false)
            }
            
            if let autoCompleteStrings = autoCompleteStrings, let autoCompleteAttributes = autoCompleteAttributes {
                for i in 0..<autoCompleteStrings.count{
                    let str = autoCompleteStrings[i] as NSString
                    let range = str.range(of: text!, options: .caseInsensitive)
                    let attString = NSMutableAttributedString(string: autoCompleteStrings[i], attributes: attrs)
                    attString.addAttributes(autoCompleteAttributes, range: range)
                    attributedAutoCompleteStrings.append(attString)
                }
            }
        }
        autoCompleteTableView?.reloadData()
    }
    
    func textFieldDidChange(){
        guard let _ = text else {
            return
        }
        
        onTextChange(text!)
        if text!.isEmpty{ autoCompleteStrings = nil }
        DispatchQueue.main.async(execute: { () -> Void in
            self.autoCompleteTableView?.isHidden =  self.hidesWhenEmpty! ? self.text!.isEmpty : false
        })
    }
    
    func textFieldDidEndEditing() {
        autoCompleteTableView?.isHidden = true
    }
}

//MARK: - UITableViewDataSource - UITableViewDelegate
extension AutoCompleteTextField: UITableViewDataSource, UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return autoCompleteStrings != nil ? (autoCompleteStrings!.count > maximumAutoCompleteCount ? maximumAutoCompleteCount : autoCompleteStrings!.count) : 0
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "autocompleteCellIdentifier"
        var cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier)
        if cell == nil{
            cell = UITableViewCell(style: .default, reuseIdentifier: cellIdentifier)
        }
        
        if enableAttributedText{
            cell?.textLabel?.attributedText = attributedAutoCompleteStrings[indexPath.row]
        }
        else{
            cell?.textLabel?.font = autoCompleteTextFont
            cell?.textLabel?.textColor = autoCompleteTextColor
            cell?.textLabel?.text = autoCompleteStrings![(indexPath as NSIndexPath).row]
        }
        
        cell?.contentView.gestureRecognizers = nil
        return cell!
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let cell = tableView.cellForRow(at: indexPath as IndexPath)
        
        if let selectedText = cell?.textLabel?.text {
            self.text = selectedText
            onSelect(selectedText, indexPath as NSIndexPath)
        }
        
        DispatchQueue.main.async(execute: { () -> Void in
            tableView.isHidden = self.hidesWhenSelected
        })
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return autoCompleteCellHeight
    }
}

