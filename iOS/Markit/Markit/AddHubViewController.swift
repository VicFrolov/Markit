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
    
    override func viewDidLoad() {
        super.viewDidLoad()
        hubsField.addTarget(self, action: #selector(textViewDidChange), for: .editingChanged)

        // Do any additional setup after loading the view.
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
    
    
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
