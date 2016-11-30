//
//  EditProfileViewController.swift
//  Markit
//
//  Created by Bryan Ku on 11/28/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import FirebaseDatabase
import FirebaseAuth

class EditProfileViewController: UIViewController {
    @IBOutlet weak var profilePicture: UIImageView!
    @IBOutlet weak var firstNameTextField: UITextField!
    @IBOutlet weak var lastNameTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var hubTextField: UITextField!
    @IBOutlet weak var preferedPaymentTextField: UITextField!
    var firstName = "", lastName = "", email = "", username = "", hub = "", preferedPayment = ""
    var ref: FIRDatabaseReference!
    
    override func viewDidLoad() {
        for view in self.view.subviews as [UIView] {
            if let textField = view as? UITextField {
                drawBottomBorder(textField: textField)
            }
        }
        firstNameTextField.text = self.firstName
        lastNameTextField.text  = self.lastName
        emailTextField.text     = self.email
        usernameTextField.text  = self.username
        hubTextField.text       = self.hub
    }
    
    @IBAction func updateProfile(sender: UIButton) {
        ref = FIRDatabase.database().reference()
        let userID = FIRAuth.auth()?.currentUser?.uid
        let updatedProfile = ["email"             : self.emailTextField.text as String!,
                              "firstName"         : self.firstNameTextField.text as String!,
                              "lastName"          : self.lastNameTextField.text as String!,
                              "userHub"           : self.hubTextField.text as String!,
                              "username"          : self.usernameTextField.text as String!,
                              "paymentPreference" : "cash"] as [String : Any]
        ref.child("/users/\(userID!)").updateChildValues(updatedProfile)
        
    }
    
    override func viewDidLayoutSubviews() {
        makeProfilePicCircular()
    }
    
    func makeProfilePicCircular() {
        profilePicture.layer.borderWidth = 1
        profilePicture.layer.masksToBounds = false
        profilePicture.layer.borderColor = UIColor.clear.cgColor
        profilePicture.layer.cornerRadius = profilePicture.frame.height/2
        profilePicture.clipsToBounds = true
    }
    
    func drawBottomBorder(textField: UITextField) {
        let border = CALayer()
        let width = CGFloat(1.0)
        border.borderColor = UIColor.darkGray.cgColor
        border.frame = CGRect(x: 0, y: textField.frame.size.height - width, width:  textField.frame.size.width, height: textField.frame.size.height)
        border.borderWidth = width
        textField.layer.addSublayer(border)
        textField.layer.masksToBounds = true
        
    }
    

}
