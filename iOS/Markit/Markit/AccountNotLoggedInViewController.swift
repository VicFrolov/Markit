//
//  AccountNotLoggedInViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/27/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import FBSDKLoginKit

class AccountNotLoggedInViewController: UIViewController, FBSDKLoginButtonDelegate {
    @IBOutlet weak var createAccount: UIButton!
    @IBOutlet weak var logIn: UIButton!

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let loginButton = FBSDKLoginButton()
        view.addSubview(loginButton)
        
        loginButton.frame = CGRect(x: 16, y: 480, width: view.frame.width - 32, height: 50)
        
        loginButton.delegate = self
        loginButton.readPermissions = ["email", "public_profile"]
        
        createAccount.layer.borderWidth = 1.0
        createAccount.layer.borderColor = UIColor.white.cgColor

        //makes navbar invisible with no text
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), for: .default)
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationController?.navigationBar.isTranslucent = true
        self.navigationController?.view.backgroundColor = UIColor.clear
        self.navigationController?.navigationBar.tintColor = UIColor.white
        navigationItem.backBarButtonItem = UIBarButtonItem(title: "", style: .plain, target: nil, action: nil)
    }
    
    func loginButtonDidLogOut(_ loginButton: FBSDKLoginButton!) {
        print("LOGGED OUT OF FACEBOOK")
    }
    
    func loginButton(_ loginButton: FBSDKLoginButton!, didCompleteWith result: FBSDKLoginManagerLoginResult!, error: Error!) {
        if error != nil {
            print (error)
            return
        }
        
        print("SUCCESSFULLY LOGGED IN WITH FACEBOOK")
        FBSDKGraphRequest(graphPath: "/me", parameters: ["fields": "id, name, email"]).start {
            (connection, result, err) in
            
            if err != nil {
                print("FAILED TO START GRAPH REQUEST:", err!)
                return
            }
            
            print(result!)
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
}
