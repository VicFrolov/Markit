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

class ListingsAdvancedSearchViewController: UIViewController, UITextViewDelegate, UITextFieldDelegate {

    //  These are for the Advanced Search scene
    var rangeSlider: MARKRangeSlider!
    var autoCompleteTextField: AutoCompleteTextField!
    @IBOutlet var advancedSearchContainerView: ListingsAdvancedSearchView!
    
    var databaseRef: FIRDatabaseReference!
    var tagRef:      FIRDatabaseReference!
    var hubRef:      FIRDatabaseReference!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        self.autoCompleteTextField = AutoCompleteTextField()
        configureTextField()

        self.rangeSlider           = MARKRangeSlider()
        self.databaseRef           = FIRDatabase.database().reference()
        self.tagRef                = self.databaseRef.child("tags")
        self.hubRef                = self.databaseRef.child("hubs")
        
        // Do any additional setup after loading the view.
        advancedSearchContainerView.tags.delegate     = self
        advancedSearchContainerView.keywords.delegate = self
        advancedSearchContainerView.hubs.delegate     = self
        advancedSearchContainerView.minPrice.delegate = self
        advancedSearchContainerView.maxPrice.delegate = self
        
        advancedSearchContainerView.minPrice?.text = "0.00"
        advancedSearchContainerView.maxPrice?.text = "2500.00"
        rangeSlider.addTarget(self, action: #selector(rangeSliderValueChanged), for: .valueChanged)
        advancedSearchContainerView.minPrice.addTarget(self, action: #selector(didEnterMin), for: .editingDidEnd)
        advancedSearchContainerView.maxPrice.addTarget(self, action: #selector(didEnterMax), for: .editingDidEnd)
        rangeSlider.setMinValue(0.0, maxValue: 3000.0)
        rangeSlider.setLeftValue(0.0, rightValue: 2500.0)
//        var image = UIImage(named: "slider")
//        image = image?.resizableImage(withCapInsets: UIEdgeInsets(top: 1.0, left: 0.0, bottom: 0.0,  right: 0.0))
        
        view.insertSubview(rangeSlider, at: 1)
        
        loadTags()
    }
    
    func configureTextField() {
        self.autoCompleteTextField.maximumAutoCompleteCount = 5
        let tags = [String]()
        self.autoCompleteTextField.autoCompleteStrings = tags
    }
    
//    func handleTextFieldInterface() {
//        autoCompleteTextField.onTextChange = {[weak self] text in
//            if !text.isEmpty {
//                self?.fetchAutoCompleteTags(keyword: text)
//            }
//        }
//        
//        autoCompleteTextField.onSelect = {[weak self] text, indexPath in
//            advancedSearchContainerView.hubs?.text = advancedSearchContainerView.hubs?.text + ", " + text
//        }
//    }
    
    override func viewDidLayoutSubviews() {
        let margin: CGFloat = 20.0
        let width = view.bounds.width - 2.0 * margin
        rangeSlider.frame = CGRect(x: margin, y: margin + topLayoutGuide.length, width: width, height: 355.0)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func loadTags () {
        var tags: [String] = [String]()

        self.tagRef!.observe(.childAdded, with: { (snapshot) -> Void in
            if let dictionary = snapshot.value as? [String: AnyObject] {
                let tag = (dictionary["tags"] as! String?)!
                
                print("TAGS \(snapshot)")
                tags.append(tag)
                print("HERE \(tag)")
            }
        })
        
        self.autoCompleteTextField.autoCompleteStrings = tags
    }
    
    func fetchAutoCompleteTags (keyword: String) {
        
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
        
//    func textViewDidBeginEditing(_ textView: UITextView) {
//        if textView.textColor == UIColor.lightGray {
//            textView.text = nil
//            textView.textColor = UIColor.black
//        }
//        print(textView.text)
//    }
//
//    func textViewDidChange(_ textView: UITextView) {
//        if textView.text.isEmpty {
//            textView.text = "Ex. watch, apple, wearable"
//            textView.textColor = UIColor.lightGray
//        }
////        print(self.advancedSearchContainerView.tags.text)
//    }
    
    func rangeSliderValueChanged(rangeSlider: MARKRangeSlider) {
        print("Range Slider value changed: (\(rangeSlider.leftValue) \(rangeSlider.rightValue))")
        advancedSearchContainerView.minPrice?.text = String(format: "%.2f", rangeSlider.leftValue)
        advancedSearchContainerView.maxPrice?.text = String(format: "%.2f", rangeSlider.rightValue)
    }
}
