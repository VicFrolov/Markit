//
//  AddTagsViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/27/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class AddTagsViewController: UIViewController {

    @IBOutlet weak var tagLabel: UILabel!
    @IBOutlet weak var tags: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tags.addTarget(self, action: #selector(self.textViewDidChange), for: .editingChanged)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    @IBAction func submitTags(_ sender: UIButton) {
        let trimmedTag = tags.text!.trimmingCharacters(in: .whitespacesAndNewlines)
        
        if trimmedTag.characters.count != 0 {
            performSegue(withIdentifier: "unwindTag", sender: self)
        } else {
            let alertController = UIAlertController(title: "Empty description", message:
                "Please give 2 to 5 tags for the item", preferredStyle: UIAlertControllerStyle.alert)
            alertController.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.default,handler: nil))
            self.present(alertController, animated: true, completion: nil)
        }
    }
    
    override func viewDidAppear(_ animated: Bool) {
        tags.becomeFirstResponder()
    }
    
    func textViewDidChange(textView: UITextView) {
        tagLabel.text = tags.text
    }
}
