use std::collections::HashSet;

// Definition for singly-linked list.
// #[derive(PartialEq, Eq, Clone, Debug)]
// pub struct ListNode {
//   pub val: i32,
//   pub next: Option<Box<ListNode>>
// }
//
// impl ListNode {
//   #[inline]
//   fn new(val: i32) -> Self {
//     ListNode {
//       next: None,
//       val
//     }
//   }
// }
impl Solution {
    pub fn modified_list(nums: Vec<i32>, head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let set: HashSet<i32> = nums.into_iter().collect();

        let mut src = head;                   // we consume nodes from here
        let mut res: Option<Box<ListNode>> = None; // filtered list being built
        let mut tail = &mut res;              // &mut Option<Box<ListNode>> cursor to the tail

        while let Some(mut node) = src {
            src = node.next.take();           // detach next to avoid aliasing
            if !set.contains(&node.val) {
                *tail = Some(node);           // append node to the result list
                // advance tail to the `next` field we just appended
                tail = &mut tail.as_mut().unwrap().next;
            }
        }

        res
    }
}
