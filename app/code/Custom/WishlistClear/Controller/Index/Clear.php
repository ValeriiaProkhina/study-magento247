<?php

namespace Custom\WishlistClear\Controller\Index;

use Magento\Framework\App\Action\Action;
use Magento\Framework\App\Action\Context;
use Magento\Framework\Controller\Result\JsonFactory;
use Magento\Customer\Model\Session as CustomerSession;
use Magento\Wishlist\Model\WishlistFactory;

class Clear extends Action
{
    protected $customerSession;
    protected $wishlistFactory;
    protected $jsonFactory;

    public function __construct(
        Context $context,
        CustomerSession $customerSession,
        WishlistFactory $wishlistFactory,
        JsonFactory $jsonFactory
    ) {
        $this->customerSession = $customerSession;
        $this->wishlistFactory = $wishlistFactory;
        $this->jsonFactory = $jsonFactory;
        parent::__construct($context);
    }

    public function execute()
    {
        $result = $this->jsonFactory->create();
        if (!$this->customerSession->isLoggedIn()) {
            return $result->setData([
                'success' => false,
                'message' => __('You must be logged in to clear the wishlist.')
            ]);
        }

        try {
            $customerId = $this->customerSession->getCustomerId();
            $wishlist = $this->wishlistFactory->create()->loadByCustomerId($customerId, true);

            foreach ($wishlist->getItemCollection() as $item) {
                $item->delete();
            }

            $wishlist->save();

            $this->_eventManager->dispatch('wishlist_items_renewed', ['wishlist' => $wishlist]);
            $this->customerSession->setWishlistItemCount(0);

            return $result->setData([
                'success' => true,
                'message' => __('Wishlist cleared successfully.')
            ]);
        } catch (\Exception $e) {
            return $result->setData([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
