//
//  AccountNotLoggedInViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/27/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class AccountNotLoggedInViewController: UIViewController {
    @IBOutlet weak var createAccount: UIButton!
    @IBOutlet weak var logIn: UIButton!

    override func viewDidLoad() {
        super.viewDidLoad()
        
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

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
}
