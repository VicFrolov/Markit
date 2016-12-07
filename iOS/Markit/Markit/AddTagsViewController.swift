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
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    @IBAction func submitTags(_ sender: UIButton) {
    }
    
    override func viewDidAppear(_ animated: Bool) {
        tags.becomeFirstResponder()
    }
}
