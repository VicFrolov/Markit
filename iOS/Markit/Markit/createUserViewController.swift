//
//  createUserViewController.swift
//  Markit
//
//  Created by rrao on 9/25/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase
import FirebaseAuth

class createUserViewController: UIViewController {
    
    var ref: FIRDatabaseReference!
    @IBOutlet var emailTextField: UITextField!
    @IBOutlet var passwordTextField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.ref = FIRDatabase.database().reference()
    }
    
    @IBAction func createUser(sender: UIButton) {
        let email: String! = emailTextField.text
        let password: String! = passwordTextField.text
        
        if isValidEmail(email: email) && password.characters.count > 5 {
            FIRAuth.auth()?.createUser(withEmail: email, password: password) { (user, error) in
                NSLog(String(format: "Successfully created user: %@", email!))
            }
        }
    }
    
    func isValidEmail(email: String) -> Bool {
        let emailRegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
        
        let emailTest = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        return emailTest.evaluate(with: email)
    }
    
}
