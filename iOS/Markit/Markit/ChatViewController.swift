//
//  ChatViewController.swift
//  Markit
//
//  Created by Trixie on 11/29/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit
import Firebase

class ChatViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {

    @IBOutlet weak var chatTableViewController: UITableView!
    
    // These are temporary local data
    let sampleImages      = ["cafedeadend.jpg", "homei.jpg"]
    let users             = ["User-A", "User-B"]
    let message           = ["Hi", "Hello"]
    let lastSent          = ["Yesterday", "7 years ago"]
    
    let chatTableViewCell = ChatTableViewCell()
    var senderDisplayName: String?
    var newConversationTextField: UITextField?
    private var conversations: [String] = []
    
    private lazy var messageRef: FIRDatabaseReference = FIRDatabase.database().reference().child("messages")
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Uncomment the following line to preserve selection between presentations
//         self.clearsSelectionOnViewWillAppear = false
        
//        self.navigationItem.leftBarButtonItem = self.editButtonItem
        
        self.chatTableViewController.delegate = self
        self.chatTableViewController.dataSource = self
        
        self.chatTableViewController.reloadData()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Table view data source
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return users.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellID = "ChatCell"
        let cell   = tableView.dequeueReusableCell(withIdentifier: cellID, for: indexPath) as! ChatTableViewCell
        let row    = indexPath.row
        
        cell.chatImageView?.image     = UIImage(named: sampleImages[row])
        cell.chatUsername?.text       = users[row]
        cell.chatMessagePreview?.text = message[row]
        cell.lastSent?.text           = lastSent[row]
        
        return cell
    }

    // MARK: - Table view delegate
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        self.chatTableViewController.deselectRow(at: indexPath, animated: true)
        let row = indexPath.row
        print(users[row])
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        super.prepare(for: segue, sender: sender)
        
        let chatVC = segue.destination as! ChatMessageViewController
        chatVC.senderDisplayName = "Zach"
    }
    
}
