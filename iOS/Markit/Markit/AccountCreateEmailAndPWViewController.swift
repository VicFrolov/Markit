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
    @IBOutlet weak var checkmarkEmail: UIImageView!
    @IBOutlet weak var checkmarkPassword: UIImageView!
    
    @IBAction func nextStep(_ sender: AnyObject) {
        if (!checkmarkEmail.isHidden && !checkmarkPassword.isHidden) {
            self.performSegue(withIdentifier: "segueToHub", sender: self)
        }
    }
    
    func isValidEmail(testStr:String) -> Bool {
        // print("validate calendar: \(testStr)")
        let emailRegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.edu"
        
        let emailTest = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        return emailTest.evaluate(with: testStr)
    }
    
    func textViewDidChange(textView: UITextView) {
        let minPasswordLength = 8
        
        checkmarkPassword.isHidden = pass.text!.characters.count >= minPasswordLength ? false : true
        
        checkmarkEmail.isHidden = isValidEmail(testStr: email.text!) ? false : true
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        checkmarkEmail.isHidden = true
        checkmarkPassword.isHidden = true
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    
    override func viewDidAppear(_ animated: Bool) {
        email.becomeFirstResponder()
    }
    
    override func viewDidLayoutSubviews() {
        
        email.addTarget(self, action : #selector(self.textViewDidChange), for: .editingChanged)
        pass.addTarget(self, action: #selector(self.textViewDidChange), for: .editingChanged)
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
