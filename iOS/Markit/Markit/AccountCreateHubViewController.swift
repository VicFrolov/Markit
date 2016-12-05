//
//  AccountCreateHubViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/27/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase
import FirebaseAuth

class AccountCreateHubViewController: UIViewController {
    var ref: FIRDatabaseReference!
    @IBOutlet weak var hub:UITextField!
    @IBOutlet weak var username: UITextField!
    @IBOutlet weak var markedHub:UIImageView!
    @IBOutlet weak var markedUsername: UIImageView!
    @IBOutlet weak var markedPaymentPreference: UIImageView!
    @IBOutlet weak var badUsername: UILabel!
    @IBOutlet weak var paymentCashButton: UIButton!
    @IBOutlet weak var paymentVenmoButton: UIButton!
    @IBOutlet weak var paymentOtherButton: UIButton!
    var userInfo: [String]!
    
    @IBOutlet weak var paymentPreference: UITextField!
    @IBAction func finishSignup(_ sender: AnyObject) {
        if !markedHub.isHidden && !markedUsername.isHidden {
            FIRAuth.auth()?.createUser(withEmail: userInfo[2], password: userInfo[3]) { (user, error) in
                
                let date = Date()
                let dateFormatter = DateFormatter()
                dateFormatter.dateFormat = "EEE MMM dd yyy hh:mm:ss zzzz"
                let currentDate = dateFormatter.string(from: date as Date)
                
                NSLog(String(format: "Successfully created user: %@", self.userInfo[2]))
                let uidRef = self.ref.child("/users/" + user!.uid)
                let paymentPreference = ["0": "cash"]
                let userJson = ["dateCreated"       : currentDate,
                                "email"             : self.userInfo[2],
                                "favorites"         : "",
                                "firstName"         : self.userInfo[0],
                                "lastName"          : self.userInfo[1],
                                "uid"               : user!.uid,
                                "userHub"           : self.hub.text!,
                                "username"          : self.username.text!,
                                "paymentPreference" : paymentPreference] as [String : Any]
                uidRef.setValue(userJson)
                
                FIRAuth.auth()!.signIn(withEmail: self.userInfo[2], password: self.userInfo[3]){ (user, error) in
                    if let error = error {
                        print("Sign in failed:", error.localizedDescription)
                    } else {
                        print("user signed in")
                        self.dismiss(animated: false, completion: {
                            self.performSegue(withIdentifier: "successCreateAccount", sender: self)
                        })
                    }
                }
                
                
            }
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        self.ref = FIRDatabase.database().reference()
        markedHub.isHidden = true
        markedUsername.isHidden = true
        markedPaymentPreference.isHidden = true
        badUsername.isHidden = true
        drawButtonWhiteBorder(button: paymentCashButton)
        drawButtonWhiteBorder(button: paymentVenmoButton)
        drawButtonWhiteBorder(button: paymentOtherButton)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        username.becomeFirstResponder()
    }
    
    func isValidUsername(testStr:String) -> Bool {
        let usernameRegEx = "[A-Z0-9a-z]+"
        let usernameTest = NSPredicate(format:"SELF MATCHES %@", usernameRegEx)
        return usernameTest.evaluate(with: testStr)
    }
    
    func drawButtonWhiteBorder(button: UIButton) {
        button.backgroundColor = .clear
        button.layer.cornerRadius = 3
        button.layer.borderWidth = 1
        button.layer.borderColor = UIColor.white.cgColor
    }
    
    func textViewDidChange(textView: UITextView) {
        
        if username.text!.characters.count > 2 {
            let namesRef = ref.child("/usernames")

            namesRef.observeSingleEvent(of: FIRDataEventType.value, with: {
                snap in
                
                if !self.isValidUsername(testStr: self.username.text!) {
                    self.badUsername.text = "Sorry, only letters and numbers allowed"
                    self.badUsername.isHidden = false
                    self.markedUsername.isHidden = true
                } else if snap.hasChild(self.username.text!.lowercased()) {
                    print("name exists")
                    self.badUsername.text = "Sorry, that username is taken :("
                    self.badUsername.isHidden = false
                    self.markedUsername.isHidden = true
                } else {
                    print("name does not exist!")
                    self.badUsername.isHidden = true
                    self.markedUsername.isHidden = false
                }
            })
        }
        //actually set up the hub selectin feature later
        //for now it's a dumby number of 5
        let dumbyFakeApproval = 2
        markedHub.isHidden = hub.text!.characters.count >= dumbyFakeApproval ? false : true
    }
    
    func drawWhiteBottomBorder(textField: UITextField) {
        let bottomLine = CALayer()
        bottomLine.frame = CGRect(origin: CGPoint(x: 0, y:textField.frame.height - 1), size: CGSize(width: textField.frame.width, height:  1))
        bottomLine.backgroundColor = UIColor.white.cgColor
        textField.borderStyle = UITextBorderStyle.none
        textField.layer.addSublayer(bottomLine)
    }

    override func viewDidLayoutSubviews() {
        hub.addTarget(self, action: #selector(self.textViewDidChange), for: .editingChanged)
        username.addTarget(self, action: #selector(self.textViewDidChange), for: .editingChanged)
        paymentPreference.addTarget(self, action: #selector(self.textViewDidChange), for: .editingChanged)
        drawWhiteBottomBorder(textField: hub)
        drawWhiteBottomBorder(textField: username)
        drawWhiteBottomBorder(textField: paymentPreference)

    }

}
