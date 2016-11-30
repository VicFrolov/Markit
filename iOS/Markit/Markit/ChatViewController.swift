//
//  ChatViewController.swift
//  Markit
//
//  Created by Trixie on 11/29/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class ChatViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {

    @IBOutlet weak var chatTableViewController: UITableView!
    
    let sampleImages      = ["cafedeadend.jpg", "homei.jpg"]
    let users             = ["User-A", "User-B"]
    let message           = ["Hi", "Hello"]
    let lastSent          = ["Yesterday", "7 years ago"]
    let chatTableViewCell = ChatTableViewCell()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false
        
        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
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
        chatVC.senderDisplayName = "Zack"
        
    }
    
    /*
     // Override to support conditional editing of the table view.
     override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
     // Return false if you do not want the specified item to be editable.
     return true
     }
     */
    
    /*
     // Override to support editing the table view.
     override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
     if editingStyle == .delete {
     // Delete the row from the data source
     tableView.deleteRows(at: [indexPath], with: .fade)
     } else if editingStyle == .insert {
     // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
     }
     }
     */
    
    /*
     // Override to support rearranging the table view.
     override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {
     
     }
     */
    
    /*
     // Override to support conditional rearranging of the table view.
     override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
     // Return false if you do not want the item to be re-orderable.
     return true
     }
     */
    
    /*
     // MARK: - Navigation
     
     // In a storyboard-based application, you will often want to do a little preparation before navigation
     override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
     // Get the new view controller using segue.destinationViewController.
     // Pass the selected object to the new view controller.
     }
     */

}
