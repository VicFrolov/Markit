//
//  TagListViewController.swift
//  Markit
//
//  Created by Bryan Ku on 11/30/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class TagListViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {
    @IBOutlet weak var tableView: UITableView!
    var items = [String]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
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
    }}
