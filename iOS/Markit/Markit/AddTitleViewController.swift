//
//  AddTitleViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/27/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class AddTitleViewController: UIViewController {
    
    @IBOutlet weak var itemTitle: UITextField!
    @IBOutlet weak var itemTitleLabel: UILabel!
    
    @IBAction func tapButton(sender: UIButton) {
        if itemTitle.text!.characters.count > 5 && itemTitle.text!.characters.count < 24 {
            performSegue(withIdentifier: "unwindAddTitle", sender: self)
            print("wat")
        } else {
            let alertController = UIAlertController(title: "Invalid Price", message:
                "Please enter a valid title :)", preferredStyle: UIAlertControllerStyle.alert)
            alertController.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.default,handler: nil))
            
            self.present(alertController, animated: true, completion: nil)
        }
    }
    
    func textViewDidChange(textView: UITextView) {
        let fontSize: CGFloat = 30.0
        if itemTitle.text!.characters.count > 24 {
            itemTitleLabel.font = UIFont(name: "HelveticaNeue", size: (fontSize - 13.0))
            itemTitleLabel.text = "Please choose a shorter title\n (under 24 characters)"
        } else {
            itemTitleLabel.font = UIFont(name: "HelveticaNeue", size: fontSize)
            itemTitleLabel.text = itemTitle.text
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        itemTitle.addTarget(self, action: #selector(self.textViewDidChange), for: .editingChanged)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
}
