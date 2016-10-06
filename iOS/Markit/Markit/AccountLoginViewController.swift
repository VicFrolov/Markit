//
//  LoginViewController.swift
//  Markit
//
//  Created by rrao on 9/25/16.
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
    }
    
    @IBAction func getUserInfo(sender: UIButton) {
        let email: String! = emailTextField.text
        let pass: String! = passwordTextField.text
        
        if (email != "" && pass != "") {
            FIRAuth.auth()!.signIn(withEmail: email, password: pass){ (user, error) in
                if let error = error {
                    print("Sign in failed:", error.localizedDescription)
                } else {
                    self.performSegue(withIdentifier: "userLoggedIn", sender: self)
                }
            }
        }
        else {
            NSLog("Invalid email or password.")
        }
    }
    
    override func viewDidLayoutSubviews() {
        //only display a bottom-border for the UITextView
        let bottomLine = CALayer()
        bottomLine.frame = CGRect(origin: CGPoint(x: 0, y:emailTextField.frame.height - 1), size: CGSize(width: emailTextField.frame.width, height:  1))
        bottomLine.backgroundColor = UIColor.white.cgColor
        emailTextField.borderStyle = UITextBorderStyle.none
        emailTextField.layer.addSublayer(bottomLine)
     
    }
}
