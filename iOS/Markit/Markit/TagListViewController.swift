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
    var toDoItems = [WatchListItem]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.dataSource = self
        tableView.delegate = self
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
        
        if toDoItems.count > 0 {
            return
        }
        toDoItems.append(WatchListItem(text: "Iphone"))
        toDoItems.append(WatchListItem(text: "Mattress"))
        toDoItems.append(WatchListItem(text: "Microwave"))
        toDoItems.append(WatchListItem(text: "Desk"))
        toDoItems.append(WatchListItem(text: "Chair"))
    }
    
    
    private func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return toDoItems.count
    }
    
    func tableView(_ tableView: UITableView,
                   cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath as IndexPath)
        let item = toDoItems[indexPath.row]
        cell.textLabel?.text = item.text
        return cell
    }
}
