//
//  SellingViewController.swift
//  Markit
//
//  Created by Bryan Ku on 11/30/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class SellingListViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    @IBOutlet weak var tableView: UITableView!
    var items = [String]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if items.count > 0 {
            return
        }
        items.append("SellingListView")
        items.append("Iphone 7")
        items.append("Chair")
        items.append("Panda Cup")
        items.append("Fossil Watch")
        items.append("Full Sized Mattress")
        items.append("Microwave")
        items.append("Samsung 30' TV")
        items.append("History Book")
        items.append("Speakers")
        items.append("Concert Tickets")
        items.append("Couch")
    }
    
    private func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return items.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "itemCell", for: indexPath) as! SellingListTableViewCell
        
        let itemName = items[indexPath.row]
        cell.itemNameLabel?.text = itemName
        cell.itemImageView?.image = UIImage(named: itemName)
        
        return cell
    }
    
}
