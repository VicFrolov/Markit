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

    
    var itemDollars:String = ""
    
    @IBAction func itemPrice(_ sender: AnyObject) {
        itemDollars = price.text!
        print(itemDollars)
    }
    
    func textViewDidChange(textView: UITextView) {
        priceLabel.text = price.text
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        price.addTarget(self, action: #selector(self.textViewDidChange), for: .editingChanged)


        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewDidAppear(_ animated: Bool) {
        price.becomeFirstResponder()
    }
    

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
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
