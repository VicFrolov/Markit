//
//  AddPriceViewController.swift
//  Markit
//
//  Created by Victor Frolov on 9/25/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class AddPriceViewController: UIViewController {
    @IBOutlet weak var price: UITextField!
    @IBOutlet weak var priceLabel: UILabel!
    let priceRange = 1..<125001
    
    @IBAction func tapButton(sender: UIButton) {
        if price.text!.characters.count > 0 && priceRange.contains(Int(price.text!)!) {
            performSegue(withIdentifier: "unwindAddPrice", sender: self)
        } else {
            let alertController = UIAlertController(title: "Invalid Price", message:
                "Please enter a valid price :)", preferredStyle: UIAlertControllerStyle.alert)
            alertController.addAction(UIAlertAction(title: "Dismiss", style: UIAlertActionStyle.default,handler: nil))
            self.present(alertController, animated: true, completion: nil)
        }
    }
    
    func textViewDidChange(textView: UITextView) {
        priceLabel.text = price.text
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        price.addTarget(self, action: #selector(self.textViewDidChange), for: .editingChanged)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        price.becomeFirstResponder()
    }
}
