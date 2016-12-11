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
    @IBOutlet weak var hubs: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        hubs.addTarget(self, action: #selector(textViewDidChange), for: .editingChanged)

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewDidAppear(_ animated: Bool) {
        hubs.becomeFirstResponder()
    }
    
    func textViewDidChange(textView: UITextView) {
        hubsLabel.text = hubs.text
    }
    
    @IBAction func submitHubs(_ sender: UIButton) {
        let trimmedHubs = hubs.text!.trimmingCharacters(in: .whitespacesAndNewlines)
        
        if trimmedHubs.characters.count != 0 {
            performSegue(withIdentifier: "unwindHub", sender: self)
        } else {
            let alertController = UIAlertController(title: "Empty description", message:
                "Please give this item a hub", preferredStyle: UIAlertControllerStyle.alert)
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
