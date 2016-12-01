//
//  LoggedInOrNotLoggedInViewController.swift
//  Markit
//
//  Created by Bryan Ku on 11/28/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import FirebaseAuth

class LoggedInOrNotLoggedInViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //definesPresentationContext = true
    }
    
    override func viewDidAppear(_ animated: Bool) {
        if FIRAuth.auth()?.currentUser != nil {
            // User is signed in.
            // ...
            print("Logged in")
            performSegue(withIdentifier: "segueToProfileView", sender: nil)
        } else {
            // No user is signed in.
            // ...
            print("No user logged in")
            performSegue(withIdentifier: "segueToAccountNotLoggedIn", sender: nil)
        }
    }
}
