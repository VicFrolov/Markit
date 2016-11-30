//
//  ChatMessageViewController.swift
//  Markit
//
//  Created by Trixie on 11/30/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase
import JSQMessagesViewController

final class ChatMessageViewController: JSQMessagesViewController {
    
    var ref:     FIRDatabaseReference!
    var chatRef: FIRDatabaseReference!

    override func viewDidLoad() {
        super.viewDidLoad()

        self.ref = FIRDatabase.database().reference()
        self.chatRef = self.ref.child("chat")
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
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
