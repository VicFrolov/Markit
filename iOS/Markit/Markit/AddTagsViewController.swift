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
    @IBOutlet weak var tagsField: AutoCompleteTextField!
    
    var tagList: [String]?
    var tempTags: [String]?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tagsField.addTarget(self, action: #selector(self.textViewDidChange), for: .editingChanged)
        
        Helpers.defaultTextField(autoCompleteTextField: tagsField)
        handleTextFieldInterface()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    @IBAction func submitTags(_ sender: UIButton) {
        let trimmedTag = tagsField.text!.trim()
        
        if trimmedTag.characters.count != 0 {
            performSegue(withIdentifier: "unwindAddTag", sender: self)
        } else {
            let alertController = UIAlertController(title: "Invalid Tags", message:
                "Please give 2 to 5 tags.\n(Ex. phone, electronics)", preferredStyle: UIAlertControllerStyle.alert)
            alertController.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.default,handler: nil))
            self.present(alertController, animated: true, completion: nil)
        }
    }
    
    override func viewDidAppear(_ animated: Bool) {
        tagsField.becomeFirstResponder()
    }
    
    func textViewDidChange(textView: UITextView) {
        tagLabel.text = tagsField.text
    }
    
    func handleTextFieldInterface() {
        tagsField.onTextChange = {[weak self] text in
            self?.tempTags = Helpers.fetchItemsThatMatch(with: text, list: (self?.tagList!)!)
            self?.tagsField.autoCompleteStrings = self?.tempTags
        }
        
        tagsField.onSelect = {[weak self] text, indexPath in
            self?.tagLabel.text = text
            self?.tagsField.autoCompleteStrings = self?.tagList
        }
    }
}
