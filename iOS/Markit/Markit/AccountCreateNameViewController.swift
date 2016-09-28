//
//  AccountCreateNameViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/27/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class AccountCreateNameViewController: UIViewController {

    @IBOutlet weak var first: UITextField!
    @IBOutlet weak var last: UITextField!
    @IBOutlet weak var nextButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewDidAppear(_ animated: Bool) {
        first.becomeFirstResponder()
    }

    override func viewDidLayoutSubviews() {
        
        //only display a bottom-border for the UITextView
        let bottomLine = CALayer()
        bottomLine.frame = CGRect(origin: CGPoint(x: 0, y:first.frame.height - 1), size: CGSize(width: first.frame.width, height:  1))
        bottomLine.backgroundColor = UIColor.white.cgColor
        first.borderStyle = UITextBorderStyle.none
        first.layer.addSublayer(bottomLine)
        
        //same as above
        let lastNameBottomLine = CALayer()
        lastNameBottomLine.frame = CGRect(origin: CGPoint(x: 0, y:last.frame.height - 1), size: CGSize(width: last.frame.width, height:  1))
        lastNameBottomLine.backgroundColor = UIColor.white.cgColor
        last.borderStyle = UITextBorderStyle.none
        last.layer.addSublayer(lastNameBottomLine)
    }
}
