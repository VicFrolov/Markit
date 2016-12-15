//
//  AddHubViewController.swift
//  Markit
//
//  Created by Trixie on 12/5/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class AddHubViewController: UIViewController {
    
    @IBOutlet weak var hubsLabel: UILabel!
    @IBOutlet weak var hubsField: AutoCompleteTextField!
    
    var hubList: [String]?
    var tempHubs: [String]?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        hubsField.addTarget(self, action: #selector(textViewDidChange), for: .editingChanged)

        Helpers.defaultTextField(autoCompleteTextField: hubsField)
        handleTextFieldInterface()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewDidAppear(_ animated: Bool) {
        hubsField.becomeFirstResponder()
    }
    
    func textViewDidChange(textView: UITextView) {
        hubsLabel.text = hubsField.text
    }
    
    @IBAction func submitHubs(_ sender: UIButton) {
        let trimmedHubs = hubsField.text!.trim()
        
        if trimmedHubs.characters.count != 0 {
            performSegue(withIdentifier: "unwindAddHub", sender: self)
        } else {
            let alertController = UIAlertController(title: "Invalid Hub(s)", message:
                "Please designate a hub.\n(Ex. Loyola Marymount University)", preferredStyle: UIAlertControllerStyle.alert)
            alertController.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.default,handler: nil))
            self.present(alertController, animated: true, completion: nil)
        }
    }
    
    func handleTextFieldInterface() {
        hubsField.onTextChange = {[weak self] text in
            self?.tempHubs = Helpers.fetchItemsThatMatch(with: text, list: (self?.hubList!)!)
            self?.hubsField.autoCompleteStrings = self?.tempHubs
        }
        
        hubsField.onSelect = {[weak self] text, indexPath in
            self?.hubsLabel.text = text
            self?.hubsField.autoCompleteStrings = self?.hubList
        }
    }
}
