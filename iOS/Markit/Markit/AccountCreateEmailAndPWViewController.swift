//
//  AccountCreateNameViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/27/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class AccountCreateEmailAndPWViewController: UIViewController {
    
    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var pass: UITextField!
    @IBOutlet weak var nextButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewDidAppear(_ animated: Bool) {
        email.becomeFirstResponder()
    }
    
    override func viewDidLayoutSubviews() {
        
        //only display a bottom-border for the UITextView
        let bottomLine = CALayer()
        bottomLine.frame = CGRect(origin: CGPoint(x: 0, y:email.frame.height - 1), size: CGSize(width: email.frame.width, height:  1))
        bottomLine.backgroundColor = UIColor.white.cgColor
        email.borderStyle = UITextBorderStyle.none
        email.layer.addSublayer(bottomLine)
        
        //same as above
        let passNameBottomLine = CALayer()
        passNameBottomLine.frame = CGRect(origin: CGPoint(x: 0, y:pass.frame.height - 1), size: CGSize(width: pass.frame.width, height:  1))
        passNameBottomLine.backgroundColor = UIColor.white.cgColor
        pass.borderStyle = UITextBorderStyle.none
        pass.layer.addSublayer(passNameBottomLine)
    }
}
