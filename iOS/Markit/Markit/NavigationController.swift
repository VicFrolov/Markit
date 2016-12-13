//
//  NavigationController.swift
//  Markit
//
//  Created by Trixie on 12/9/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class NavigationController: UINavigationController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
//        if !CustomFirebaseAuth().isSignedIn() {
//            print("Tab Bar Controller")
//            let storyboard: UIStoryboard = UIStoryboard(name: "ListingsWhenNotLoggedIn", bundle: nil)
//            let vc = storyboard.instantiateInitialViewController() as! InitialNotLoggedInViewController
//            self.present(vc, animated: true, completion: { return })
//        }

        // Do any additional setup after loading the view.
    }
    
//    func whenNotLoggedInNavigateTo (storyboard: UIStoryboard, initialVC: UIViewController) {
//        
//    }

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
