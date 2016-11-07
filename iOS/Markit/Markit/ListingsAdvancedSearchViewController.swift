//
//  ListingsAdvancedSearchViewController.swift
//  Markit
//
//  Created by Trixie on 10/26/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import MARKRangeSlider

class ListingsAdvancedSearchViewController: UIViewController, UITextViewDelegate {

    //  These are for the Advanced Search scene
    let rangeSlider = MARKRangeSlider()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        rangeSlider.addTarget(self, action: #selector(rangeSliderValueChanged), for: .valueChanged)
        rangeSlider.setMinValue(0.0, maxValue: 3000.0)
        rangeSlider.setLeftValue(500.0, rightValue: 2500.0)
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
    
    func autoFillTags () {
        
    }
    
    func textViewDidBeginEditing(_ textView: UITextView) {
    }
    
    func rangeSliderValueChanged(rangeSlider: MARKRangeSlider) {
        print("Range Slider value changed: (\(rangeSlider.leftValue) \(rangeSlider.rightValue))")
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
