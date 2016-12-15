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
import FirebaseStorage

class EditProfileViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
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
    var profilePic: UIImage!
    let imagePicker = UIImagePickerController()
    
    override func viewDidLoad() {
        imagePicker.delegate = self
        let tapGestureRecognizer = UITapGestureRecognizer(target:self, action:#selector(imageTapped(img:)))
        profilePicture.isUserInteractionEnabled = true
        profilePicture.addGestureRecognizer(tapGestureRecognizer)
        
        
        firstNameTextField.text = self.firstName
        lastNameTextField.text  = self.lastName
        emailTextField.text     = self.email
        usernameTextField.text  = self.username
        hubTextField.text       = self.hub
        profilePicture.image    = self.profilePic
        checkPaymentPreference(paymentPrefence: self.paymentPreference, paymentOptions: ["cash", "venmo", "other"])
    }
    
    func checkPaymentPreference(paymentPrefence: NSArray, paymentOptions: [String]){
        for option in paymentOptions {
            if paymentPreference.contains(option) {
                if (option == "cash") {
                    buttonSelect(button: cashPaymentButton)
                    paymentPreferenceDict["0"] = "cash"
                } else if (option == "venmo") {
                    buttonSelect(button: venmoPaymentButton)
                    paymentPreferenceDict["1"] = "venmo"
                } else if (option == "other") {
                    buttonSelect(button: otherPaymentButton)
                    paymentPreferenceDict["2"] = "other"
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
    
    func imageTapped(img: AnyObject) {
        imagePicker.allowsEditing = true
        imagePicker.sourceType = .photoLibrary
        present(imagePicker, animated: true, completion: nil)
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        if let image = info[UIImagePickerControllerOriginalImage] as? UIImage {
            self.profilePic = image
            self.profilePicture.contentMode = .scaleAspectFill
            self.profilePicture.image = profilePic
        } else {
            print("Something went wrong")
        }
        imagePicker.dismiss(animated: true, completion: {})
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
        
        let storage = FIRStorage.storage()
        let storageRef = storage.reference(forURL: "gs://markit-80192.appspot.com")
        let imagesRef = storageRef.child("images/profileImages/\(userID!)/imageOne.png")
        let newProfilePic = profilePic.jpegData(.lowest)
        
        _ = imagesRef.put(newProfilePic!, metadata: nil) { metadata, error in
            if (error != nil) {
                print("Error uploading profile image")
            } else {
                print("Working!!")
                _ = metadata!.downloadURL
            }
        }
        
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
extension UIImage {
    enum JPEGQuality: CGFloat {
        case lowest  = 0
        case low     = 0.25
        case medium  = 0.5
        case high    = 0.75
        case highest = 1
    }
    
    /// Returns the data for the specified image in PNG format
    /// If the image object’s underlying image data has been purged, calling this function forces that data to be reloaded into memory.
    ///
    /// Returns a data object containing the PNG data, or nil if there was a problem generating the data. This function may return nil if the image has no data or if the underlying CGImageRef contains data in an unsupported bitmap format.
    var pngData: Data? { return UIImagePNGRepresentation(self) }
    
    /// Returns the data for the specified image in JPEG format.
    /// If the image object’s underlying image data has been purged, calling this function forces that data to be reloaded into memory.
    /// - returns: A data object containing the JPEG data, or nil if there was a problem generating the data. This function may return nil if the image has no data or if the underlying CGImageRef contains data in an unsupported bitmap format.
    func jpegData(_ quality: JPEGQuality) -> Data? {
        return UIImageJPEGRepresentation(self, quality.rawValue)
    }
}
