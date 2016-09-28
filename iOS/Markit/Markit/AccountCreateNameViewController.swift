//
//  AccountCreateNameViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/27/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class AccountCreateNameViewController: UIViewController {
    @IBOutlet weak var first: UITextField!
    @IBOutlet weak var last: UITextField!
    @IBOutlet weak var nextButton: UIButton!
    @IBOutlet weak var checkmarkName: UIImageView!
    @IBOutlet weak var checkmarkLastName: UIImageView!
    
    
    @IBAction func nextStep(_ sender: AnyObject) {
        if (!checkmarkName.isHidden && !checkmarkLastName.isHidden) {
            self.performSegue(withIdentifier: "nameCheckPassed", sender: self)
        }
    }
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        checkmarkName.isHidden = true
        checkmarkLastName.isHidden = true
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        first.becomeFirstResponder()
    }
    
    func textViewDidChange(textView: UITextView) {
        let minLength = 2
        if first.text!.characters.count > minLength {
            checkmarkName.isHidden = false
        } else {
            checkmarkName.isHidden = true
        }
        
        if last.text!.characters.count > minLength {
            checkmarkLastName.isHidden = false
        } else {
            checkmarkLastName.isHidden = true
        }
    }

    override func viewDidLayoutSubviews() {
        first.addTarget(self, action: #selector(self.textViewDidChange), for: .editingChanged)
        last.addTarget(self, action: #selector(self.textViewDidChange), for: .editingChanged)
        
        
        //only display a bottom-border for the UITextView
        let bottomLine = CALayer()
        bottomLine.frame = CGRect(origin: CGPoint(x: 0, y:first.frame.height - 1), size: CGSize(width: first.frame.width, height:  1))
        bottomLine.backgroundColor = UIColor.white.cgColor
        first.borderStyle = UITextBorderStyle.none
        first.layer.addSublayer(bottomLine)
        
        //same as above
        let lastNameBottomLine = CALayer()
        lastNameBottomLine.frame = CGRect(origin: CGPoint(x: 0, y:last.frame.height - 1), size: CGSize(width: last.frame.width, height:  1))
        lastNameBottomLine.backgroundColor = UIColor.white.cgColor
        last.borderStyle = UITextBorderStyle.none
        last.layer.addSublayer(lastNameBottomLine)
    }
}
