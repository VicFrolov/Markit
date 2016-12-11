//
//  CustomFirebaseAuth.swift
//  Markit
//
//  Created by Trixie on 12/8/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import Foundation
import Firebase

class CustomFirebaseAuth {

    func getCurrentUser () -> String {
        var currentUser: String = ""
        if let user = FIRAuth.auth()?.currentUser {
            currentUser = user.uid
        }
//        else {
//            FIRAuth.auth()?.signInAnonymously(completion: { (user, error) in
//                if error != nil {
//                    print ("Anonymous sign-in failure: \(error?.localizedDescription)")
//                    return
//                } else {
//                    currentUser = (user?.uid)!
//                }
//            })
//        }
        return currentUser
    }
    
    func isSignedIn () -> Bool {
        return FIRAuth.auth()?.currentUser != nil
    }
}
