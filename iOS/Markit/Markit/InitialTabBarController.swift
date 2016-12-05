//
//  InitialTabBarController.swift
//  Markit
//
//  Created by Bryan Ku on 12/4/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase

class InitialTabBarController: UITabBarController {
    
    override func viewDidLoad() {
        if FIRAuth.auth()?.currentUser != nil {
        } else {
            FIRAuth.auth()?.signInAnonymously() { (user, error) in
            }
        }
    }
}
