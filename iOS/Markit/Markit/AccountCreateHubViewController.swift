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
    @IBOutlet weak var markedHub:UIImageView!
    
    @IBAction func finishSignup(_ sender: AnyObject) {
        if !markedHub.isHidden {
            FIRAuth.auth()?.createUser(withEmail: "blarf@lmu.edu", password: "harfdarf") { (user, error) in
                NSLog(String(format: "Successfully created user: %@", "blarf@lmu.edu"))
            }
        }
        
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        self.ref = FIRDatabase.database().reference()
        markedHub.isHidden = true
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        hub.becomeFirstResponder()
    }
    
    func textViewDidChange(textView: UITextView) {
        //actually set up the hub selectin feature later
        //for now it's a dumby number of 5
        let dumbyFakeApproval = 2
        markedHub.isHidden = hub.text!.characters.count >= dumbyFakeApproval ? false : true
    }

    override func viewDidLayoutSubviews() {
        hub.addTarget(self, action: #selector(self.textViewDidChange), for: .editingChanged)

        
        //only display a bottom-border for the UITextView
        let bottomLine = CALayer()
        bottomLine.frame = CGRect(origin: CGPoint(x: 0, y:hub.frame.height - 1), size: CGSize(width: hub.frame.width, height:  1))
        bottomLine.backgroundColor = UIColor.white.cgColor
        hub.borderStyle = UITextBorderStyle.none
        hub.layer.addSublayer(bottomLine)
    }
}
