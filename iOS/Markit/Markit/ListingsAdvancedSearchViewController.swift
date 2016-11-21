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
import MLPAutoCompleteTextField

class ListingsAdvancedSearchViewController: UIViewController, UITextViewDelegate, UITextFieldDelegate {

    //  These are for the Advanced Search scene
    let rangeSlider = MARKRangeSlider()
//    let autocompleteTextField = MLPAutoCompleteTextField()
    var tagRef = FIRDatabaseReference()
    @IBOutlet var advancedSearchContainerView: ListingsAdvancedSearchView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
//        advancedSearchContainerView.tags.delegate = self
//        advancedSearchContainerView.keywords.delegate = self
//        advancedSearchContainerView.hubs.delegate = self
//        autocompleteTextField.delegate = self
//        autocompleteTextField.autoCompleteDelegate = self
//        autocompleteTextField.autoCompleteDataSource = self
//        autocompleteTextField.autoCompleteTableView.delegate = self
        
//        tagRef = FIRDatabase.database().reference().child("tags")
        
        advancedSearchContainerView.minPrice?.text = "500.00"
        advancedSearchContainerView.maxPrice?.text = "2500.00"
        rangeSlider.addTarget(self, action: #selector(rangeSliderValueChanged), for: .valueChanged)
        rangeSlider.setMinValue(0.0, maxValue: 3000.0)
        rangeSlider.setLeftValue(500.0, rightValue: 2500.0)
        var image = UIImage(named: "slider")
        image = image?.resizableImage(withCapInsets: UIEdgeInsets(top: 1.0, left: 0.0, bottom: 0.0,  right: 0.0))
        view.addSubview(rangeSlider)

    }
    
    override func viewDidLayoutSubviews() {
        let margin: CGFloat = 20.0
        let width = view.bounds.width - 2.0 * margin
        rangeSlider.frame = CGRect(x: margin, y: margin + topLayoutGuide.length, width: width, height: 355.0)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func autocomplete () {
        
    }
    
//    func textViewDidBeginEditing(_ textView: UITextView) {
//        print("Some text here")
//    }
//    
//    func textViewDidChange(_ textView: UITextView) {
//        print(self.advancedSearchContainerView.tags.text)
//    }
    
//    func autoCompleteTextField(_ textField: MLPAutoCompleteTextField!, shouldConfigureCell cell: UITableViewCell!, withAutoComplete autocompleteString: String!, with boldedString: NSAttributedString!, forAutoComplete autocompleteObject: MLPAutoCompletionObject!, forRowAt indexPath: IndexPath!) -> Bool {
//        print("WUUTT")
//        return false
//    }
    
    func rangeSliderValueChanged(rangeSlider: MARKRangeSlider) {
        print("Range Slider value changed: (\(rangeSlider.leftValue) \(rangeSlider.rightValue))")
        advancedSearchContainerView.minPrice?.text = String(format: "%.2f", rangeSlider.leftValue)
        advancedSearchContainerView.maxPrice?.text = String(format: "%.2f", rangeSlider.rightValue)
    }

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
