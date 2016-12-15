//
//  ListingsAdvancedSearchViewController.swift
//  Markit
//
//  Created by Trixie on 10/26/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase
import MARKRangeSlider

class ListingsAdvancedSearchViewController: UIViewController, UITextFieldDelegate {

    var rangeSlider:                           MARKRangeSlider!
    @IBOutlet var advancedSearchContainerView: ListingsAdvancedSearchView!
    
    var databaseRef: FIRDatabaseReference!
    var tagRef:      FIRDatabaseReference!
    var hubRef:      FIRDatabaseReference!
    var tagList: [String] = [String]()
    var hubList: [String] = [String]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        addDoneButtonOnNumericKeyboard()
        setupReferences()

        self.rangeSlider           = MARKRangeSlider()

        advancedSearchContainerView.tags.delegate     = self
        advancedSearchContainerView.keywords.delegate = self
        advancedSearchContainerView.hubs.delegate     = self
        advancedSearchContainerView.minPrice.delegate = self
        advancedSearchContainerView.maxPrice.delegate = self
        
        getTags()
        getHubs()
        
        setupRangeSlider()
        handleHubAutoComplete()
        handleTagAutoComplete()
    }
    
    func setupReferences() {
        self.databaseRef           = FIRDatabase.database().reference()
        self.tagRef                = self.databaseRef.child("tags")
        self.hubRef                = self.databaseRef.child("hubs")
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
    
    func setupRangeSlider() {
        advancedSearchContainerView.minPrice?.text = "0.00"
        advancedSearchContainerView.maxPrice?.text = "2500.00"
        rangeSlider.addTarget(self, action: #selector(rangeSliderValueChanged), for: .valueChanged)
        advancedSearchContainerView.minPrice.addTarget(self, action: #selector(didEnterMin), for: .editingDidEnd)
        advancedSearchContainerView.maxPrice.addTarget(self, action: #selector(didEnterMax), for: .editingDidEnd)
        rangeSlider.setMinValue(0.0, maxValue: 3000.0)
        rangeSlider.setLeftValue(0.0, rightValue: 2500.0)
        var image = UIImage(named: "slider")
        image = image?.resizableImage(withCapInsets: UIEdgeInsets(top: 0.0, left: 7.0, bottom: 0.0,  right: 7.0))
        rangeSlider.rangeImage = image
        
        view.insertSubview(rangeSlider, at: 1)
    }
    
    
    // This is repeating content
    func getTags () {
        tagRef.observe(.childAdded, with: { (snapshot) -> Void in
            if let tagValue = snapshot.value as! Int? {
                if tagValue > 7 {
                    self.tagList.append(snapshot.key.trim())
                }
            }
        })
    }
    
    func getHubs () {
        hubRef.observe(.childAdded, with: { (snapshot) -> Void in
            if snapshot.value! is Int {
                self.hubList.append(snapshot.key.trim())
            }
        })
    }
    
    func handleTagAutoComplete() {
        advancedSearchContainerView.tags.onTextChange = {[weak self] text in
            if !text.isEmpty {
                self?.advancedSearchContainerView.tags.autoCompleteStrings = Helpers.fetchItemsThatMatch(with: text, list: (self?.tagList)!)
            }
        }
        
        advancedSearchContainerView.tags.onSelect = {[weak self] text, indexPath in
            self?.advancedSearchContainerView.tags.text = (self?.advancedSearchContainerView.hubs?.text)! + ", " + text
        }
    }
    
    func handleHubAutoComplete() {
        advancedSearchContainerView.hubs.onTextChange = {[weak self] text in
            if !text.isEmpty {
                self?.advancedSearchContainerView.hubs.autoCompleteStrings = Helpers.fetchItemsThatMatch(with: text, list: (self?.hubList)!)
            }
        }
        
        advancedSearchContainerView.hubs.onSelect = {[weak self] text, indexPath in
            self?.advancedSearchContainerView.hubs?.text = (self?.advancedSearchContainerView.hubs?.text)! + ", " + text
        }
    }
    // up to here
    
    override func viewDidLayoutSubviews() {
        let margin: CGFloat = 20.0
        let width = view.bounds.width - 2.0 * margin
        rangeSlider.frame = CGRect(x: margin, y: margin + topLayoutGuide.length, width: width, height: 355.0)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }

//    Lots of boiler plate code for now. Will clean up later. Also will change so previous price range is kept even with error
    func didEnterMin (min: UITextField) {
        print("min value recognized")
        var minValue: CGFloat = 0.0
        let maxValue: CGFloat = CGFloat(NumberFormatter().number(from: advancedSearchContainerView.maxPrice.text!)!)
        if let tempMin = NumberFormatter().number(from: min.text!) {
            minValue = CGFloat(tempMin)
        }
        
        if minValue > 3000.0 || maxValue > 3000.0 {
            minValue = 0.0
            let alertController: UIAlertController = UIAlertController(title: "Invalid Input", message: "Please enter a price range between 0.0 and 3000.0", preferredStyle: .alert)
            let okAction = UIAlertAction(title: "OK", style: .default)
            alertController.addAction(okAction)
            present(alertController, animated: true)
        }
        rangeSlider.setLeftValue(minValue, rightValue: maxValue)
    }
    
    func didEnterMax (max: UITextField) {
        print("max value recognized")
        let minValue: CGFloat = CGFloat(NumberFormatter().number(from: advancedSearchContainerView.minPrice.text!)!)
        var maxValue: CGFloat = 2500.0
        if let tempMax = NumberFormatter().number(from: max.text!) {
            maxValue = CGFloat(tempMax)
        }
        
        if minValue > 3000.0 || maxValue > 3000.0 {
            maxValue = 2500.0
            let alertController: UIAlertController = UIAlertController(title: "Invalid Input", message: "Please enter a price range between 0.0 and 3000.0", preferredStyle: .alert)
            let okAction = UIAlertAction(title: "OK", style: .default)
            alertController.addAction(okAction)
            present(alertController, animated: true)
        }
        rangeSlider.setLeftValue(minValue, rightValue: maxValue)
    }
    
    func rangeSliderValueChanged(rangeSlider: MARKRangeSlider) {
        print("Range Slider value changed: (\(rangeSlider.leftValue) \(rangeSlider.rightValue))")
        advancedSearchContainerView.minPrice?.text = String(format: "%.2f", rangeSlider.leftValue)
        advancedSearchContainerView.maxPrice?.text = String(format: "%.2f", rangeSlider.rightValue)
    }
    
    func addDoneButtonOnNumericKeyboard() {
        let doneToolbar: UIToolbar = UIToolbar(frame: CGRect(x: 0, y: 0, width: 320, height: 50))
        doneToolbar.barStyle = UIBarStyle.default
        let flexSpace = UIBarButtonItem(barButtonSystemItem: UIBarButtonSystemItem.flexibleSpace, target: nil, action: nil)
        let done: UIBarButtonItem = UIBarButtonItem(title: "Done", style: UIBarButtonItemStyle.done, target: self, action: #selector(doneButtonAction))
        
        var items = [UIBarButtonItem]()
        items.append(flexSpace)
        items.append(done)
        
        doneToolbar.items = items
        doneToolbar.sizeToFit()
        
        self.advancedSearchContainerView.minPrice.inputAccessoryView = doneToolbar
        self.advancedSearchContainerView.maxPrice.inputAccessoryView = doneToolbar
    }
    
    func doneButtonAction() {
        self.advancedSearchContainerView.minPrice.resignFirstResponder()
        self.advancedSearchContainerView.maxPrice.resignFirstResponder()
    }
}
