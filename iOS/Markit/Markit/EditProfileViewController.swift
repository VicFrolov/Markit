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
    @IBOutlet weak var otherPaymentButton: UIButton!
    @IBOutlet weak var venmoPaymentButton: UIButton!
    @IBOutlet weak var cashPaymentButton: UIButton!
    var firstName = "", lastName = "", email = "",
        username = "" , hub = ""
    var paymentPreference : NSArray = []
    var paymentPreferenceDict = ["0": "", "1": "", "2": ""]
    var ref: FIRDatabaseReference!
    

    override func viewDidLoad() {
        firstNameTextField.text = self.firstName
        lastNameTextField.text  = self.lastName
        emailTextField.text     = self.email
        usernameTextField.text  = self.username
        hubTextField.text       = self.hub
        
    }
    
    func checkPaymentPreference(paymentPrefence: NSArray, paymentOptions: [String]){
        for option in paymentOptions {
                            print("FDSA \(option)")
            if paymentPreference.contains(option) {
                if (option == "cash") {
                    buttonSelect(button: cashPaymentButton)
                } else if (option == "venmo") {
                    buttonSelect(button: venmoPaymentButton)
                } else if (option == "other") {
                    buttonSelect(button: otherPaymentButton)
                }
            }
        }
    }
    
    override func viewDidAppear(_ animated: Bool) {
        for view in self.view.subviews as [UIView] {
            if let textField = view as? UITextField {
                drawBottomBorder(textField: textField)
            }
        }
    }
    
    
    @IBAction func updateProfile(sender: UIButton) {
        ref = FIRDatabase.database().reference()
        let userID = FIRAuth.auth()?.currentUser?.uid
        let updatedProfile = ["email"             : self.emailTextField.text as String!,
                              "firstName"         : self.firstNameTextField.text as String!,
                              "lastName"          : self.lastNameTextField.text as String!,
                              "userHub"           : self.hubTextField.text as String!,
                              "username"          : self.usernameTextField.text as String!,
                              "paymentPreference" : paymentPreferenceDict] as [String : Any]
        ref.child("/users/\(userID!)").updateChildValues(updatedProfile)
        
    }
    
    func buttonSelect(button: UIButton) {
        if (!button.isSelected) {
            button.setTitleColor(UIColor.black, for: .selected)
        }
        button.isSelected = !button.isSelected ? true : false
    }

    
    @IBAction func cashButtonSelected(sender: AnyObject) {
        buttonSelect(button: cashPaymentButton)
        paymentPreferenceDict["0"] = cashPaymentButton.isSelected ? "cash" : nil
    }
    
    @IBAction func venmoButtonSelected(sender: AnyObject) {
        buttonSelect(button: venmoPaymentButton)
        paymentPreferenceDict["1"] = venmoPaymentButton.isSelected ? "venmo" : nil
    }
    
    @IBAction func otherButtonSelected(sender: AnyObject) {
        buttonSelect(button: otherPaymentButton)
        paymentPreferenceDict["2"] = otherPaymentButton.isSelected ? "other" : nil
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
