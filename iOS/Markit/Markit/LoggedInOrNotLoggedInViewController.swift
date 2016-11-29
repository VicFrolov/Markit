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
        
        if FIRAuth.auth()?.currentUser != nil {
            // User is signed in.
            // ...
            print("hiifdsaifjasoijfas")
            performSegue(withIdentifier: "segueToProfileView", sender: nil)
        } else {
            // No user is signed in.
            // ...
            print("No useR")
            performSegue(withIdentifier: "segueToAccountNotLoggedIn", sender: nil)
        }
        
    }
    
}
