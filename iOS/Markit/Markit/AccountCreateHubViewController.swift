//
//  AccountCreateHubViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/27/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class AccountCreateHubViewController: UIViewController {
    @IBOutlet weak var hub:UITextField!

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        hub.becomeFirstResponder()
    }

    override func viewDidLayoutSubviews() {
        //only display a bottom-border for the UITextView
        let bottomLine = CALayer()
        bottomLine.frame = CGRect(origin: CGPoint(x: 0, y:hub.frame.height - 1), size: CGSize(width: hub.frame.width, height:  1))
        bottomLine.backgroundColor = UIColor.white.cgColor
        hub.borderStyle = UITextBorderStyle.none
        hub.layer.addSublayer(bottomLine)
    }
}
