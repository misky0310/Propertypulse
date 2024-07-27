import React from "react";
import { FaShare } from "react-icons/fa";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

const ShareButton = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <div className="border-4 border-blue-500 mb-2 rounded-lg">
      <h3 className="text-gray-50 text-xl font-bold text-center pb-3 pt-3">Share this property</h3>
      <div className="flex gap-3 w-full justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          qoute={property.name}
          hashtag={`#${property.type.replace(" ", "")}ForRent`}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[property.type.replace(" ", ""), "ForRent"]}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator=":: "
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property: ${shareUrl}`}
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareButton;
