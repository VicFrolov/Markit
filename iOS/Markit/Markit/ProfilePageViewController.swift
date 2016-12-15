//
//  ProfilePageViewController.swift
//  Markit
//
//  Created by Bryan Ku on 10/13/16.
//  Copyright © 2016 Victor Frolov. All rights reserved.
//

import UIKit

class ProfilePageViewController: UIPageViewController {
    
    weak var profileDelegate: ProfilePageViewControllerDelegate?
    var layoutsubs = false
    
    private(set) lazy var orderedViewControllers: [UIViewController] = {
        return [self.newViewController(title: "ProfilePage"),
                self.newViewController(title: "FavoriteListPage"),
                self.newViewController(title: "TagPage")]
    }()
    
    private func newViewController(title: String) -> UIViewController {
        return UIStoryboard(name: "Main", bundle: nil) .
            instantiateViewController(withIdentifier: "\(title)ViewController")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        dataSource = self
        delegate = self
        
        if let firstViewController = orderedViewControllers.first {
            setViewControllers([firstViewController], direction: .forward, animated: true, completion: nil)
            let beforeVC = pageViewController(self, viewControllerBefore: firstViewController) as UIViewController!
            let afterVC = pageViewController(self, viewControllerAfter: firstViewController) as UIViewController!
            setViewControllers([beforeVC!], direction: .reverse, animated: false, completion: nil)
            setViewControllers([afterVC!], direction: .forward, animated: false, completion: nil)
            
        }
        
        profileDelegate?.profilePageViewController(profilePageViewController: self, didUpdatePageCount: orderedViewControllers.count)
    }
    
    override func viewWillLayoutSubviews() {
        //Load the viewController before the starting VC then go back to the starting VC
        //viewWillLayoutSubviews() is called multiple times, so do this only once
        if !layoutsubs {
            let startingVC = self.orderedViewControllers.first as UIViewController!
            let beforeVC = pageViewController(self, viewControllerBefore: startingVC!) as UIViewController!
            
            setViewControllers([beforeVC!], direction: .reverse, animated: false, completion: nil)
            setViewControllers([startingVC!], direction: .forward, animated: false, completion: nil)
            layoutsubs = true
        }
    }
    
    
    
}

extension ProfilePageViewController: UIPageViewControllerDataSource {
    
    func pageViewController(_ pageViewController: UIPageViewController,
                            viewControllerBefore viewController: UIViewController) -> UIViewController? {
        guard let viewControllerIndex = orderedViewControllers.index(of: viewController) else {
            return nil
        }
        
        let previousIndex = viewControllerIndex - 1
        
        guard previousIndex >= 0 else {
            return orderedViewControllers.last
        }
        
        guard orderedViewControllers.count > previousIndex else {
            return nil
        }
        
        return orderedViewControllers[previousIndex]
    }
    
    func pageViewController(_ pageViewController: UIPageViewController,
                            viewControllerAfter viewController: UIViewController) -> UIViewController? {
        guard let viewControllerIndex = orderedViewControllers.index(of: viewController) else {
            return nil
        }
        
        let nextIndex = viewControllerIndex + 1
        let orderedViewControllersCount = orderedViewControllers.count
        
        guard orderedViewControllersCount != nextIndex else {
            return orderedViewControllers.first
        }
        
        guard orderedViewControllersCount > nextIndex else {
            return nil
        }
        
        return orderedViewControllers[nextIndex]
    }
        
}

extension ProfilePageViewController: UIPageViewControllerDelegate {
    
    func pageViewController(_ pageViewController: UIPageViewController,
                            didFinishAnimating finished: Bool,
                            previousViewControllers: [UIViewController],
                            transitionCompleted completed: Bool) {
        if let firstViewController = viewControllers?.first,
            let index = orderedViewControllers.index(of: firstViewController) {
                profileDelegate?.profilePageViewController(profilePageViewController: self, didUpdatePageIndex: index)
        }
    }
    
}

protocol ProfilePageViewControllerDelegate: class {
    
    /**
     Called when the number of pages is updated.
     
     - parameter tutorialPageViewController: the TutorialPageViewController instance
     - parameter count: the total number of pages.
     */
    func profilePageViewController(profilePageViewController: ProfilePageViewController,
                                    didUpdatePageCount count: Int)
    
    /**
     Called when the current index is updated.
     
     - parameter tutorialPageViewController: the TutorialPageViewController instance
     - parameter index: the index of the currently visible page.
     */
    func profilePageViewController(profilePageViewController: ProfilePageViewController,
                                    didUpdatePageIndex index: Int)
    
}
