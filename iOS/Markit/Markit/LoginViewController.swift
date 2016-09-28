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

class LoginViewController: UIViewController {
    var ref: FIRDatabaseReference!
    @IBOutlet var emailTextField: UITextField!
    @IBOutlet var passwordTextField: UITextField!
    
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
                    print(email + " " + pass)
                } else {
                    print ("Signed in with uid:", user!.uid)
                }
            }
        }
        else {
            NSLog("Invalid email or password.")
        }
    }
    
    @IBAction func unwindCreateUser(segue: UIStoryboardSegue) {
        
    }
}
