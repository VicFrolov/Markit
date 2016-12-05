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
        FIRAuth.auth()?.signInAnonymously() { (user, error) in
        }
    }
}
