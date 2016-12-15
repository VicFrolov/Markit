//
//  LoginViewController.swift
//  Markit
//
//  Created by Bryan Ku on 9/25/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase
import FirebaseAuth

class AccountLoginViewController: UIViewController {
    var ref: FIRDatabaseReference!
    @IBOutlet var emailTextField: UITextField!
    @IBOutlet var passwordTextField: UITextField!
    @IBOutlet weak var checkedEmail: UIImageView!
    @IBOutlet weak var checkedPassword: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.ref = FIRDatabase.database().reference()
        self.checkedEmail.isHidden = true
        self.checkedPassword.isHidden = true
    }
    
    @IBAction func getUserInfo(sender: UIButton) {
        let email: String! = emailTextField.text
        let pass: String! = passwordTextField.text
        
        if (!checkedEmail.isHidden && !checkedPassword.isHidden) {
            FIRAuth.auth()!.signIn(withEmail: email, password: pass){ (user, error) in
                if let error = error {
                    print("Sign in failed:", error.localizedDescription)
                } else {
                    self.dismiss(animated: false, completion: {
                        self.performSegue(withIdentifier: "userLoggedIn", sender: self)
                    })
                    print("user signed in")
                }
            }
        }
        else {
            NSLog("Invalid email or password.")
            let alert = UIAlertController(title: "Oops", message: "Invalid email or Password", preferredStyle: UIAlertControllerStyle.alert)
            alert.addAction(UIAlertAction(title: "Okay", style: UIAlertActionStyle.default, handler: nil))
            self.present(alert, animated: true, completion: nil)
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
        
        checkedEmail.isHidden = isValidEmail(testStr: emailTextField.text!) ? false : true
        
        if passwordTextField.text!.characters.count >= minPasswordLength {
            checkedPassword.isHidden = false
        } else {
            checkedPassword.isHidden = true
        }
    }
    
    override func viewDidLayoutSubviews() {
        emailTextField.addTarget(self, action: #selector(self.textViewDidChange), for: .editingChanged)
        passwordTextField.addTarget(self, action: #selector(self.textViewDidChange), for: .editingChanged)
        
        //only display a bottom-border for the UITextView
        let bottomLine = CALayer()
        bottomLine.frame = CGRect(origin: CGPoint(x: 0, y:emailTextField.frame.height - 1), size: CGSize(width: emailTextField.frame.width, height:  1))
        bottomLine.backgroundColor = UIColor.white.cgColor
        emailTextField.borderStyle = UITextBorderStyle.none
        emailTextField.layer.addSublayer(bottomLine)
        
        let bottomLine2 = CALayer()
        bottomLine2.frame = CGRect(origin: CGPoint(x: 0, y:passwordTextField.frame.height - 1), size: CGSize(width: passwordTextField.frame.width, height:  1))
        bottomLine2.backgroundColor = UIColor.white.cgColor
        passwordTextField.borderStyle = UITextBorderStyle.none
        passwordTextField.layer.addSublayer(bottomLine2)
     
    }
}
