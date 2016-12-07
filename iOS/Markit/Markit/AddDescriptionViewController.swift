//
//  AddDescriptionViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/27/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class AddDescriptionViewController: UIViewController {
    
    @IBOutlet weak var descriptionLabel: UILabel!
    @IBOutlet weak var itemDescription: UITextField!

    override func viewDidLoad() {
        super.viewDidLoad()
        itemDescription.addTarget(self, action: #selector(self.textViewDidChange), for: .editingChanged)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    @IBAction func submitDescription(_ sender: UIButton) {
        if itemDescription.text!.characters.count != 0 {
            performSegue(withIdentifier: "unwindDescription", sender: self)
        } else {
            let alertController = UIAlertController(title: "Empty description", message:
                "Please give a short description of the item", preferredStyle: UIAlertControllerStyle.alert)
            alertController.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.default,handler: nil))
            self.present(alertController, animated: true, completion: nil)
        }
    }
    
    func textViewDidChange(textView: UITextView) {
        descriptionLabel.text = itemDescription.text
    }
    
    override func viewDidAppear(_ animated: Bool) {
        itemDescription.becomeFirstResponder()
    }

    
}
