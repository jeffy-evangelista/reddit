import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "../atoms/communitiesAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // is the user signed in ?
    // if not,  open auth modal

    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };
  const getMySnippets = async () => {
    setLoading(true);
    try {
      //get users snippets
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = snippetDocs.docs.map((doc) => ({
        ...doc.data(),
      }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
      console.log(snippets);
    } catch (error) {
      console.log("getMySnippets error", error);
    }
    setLoading(false);
  };
  const joinCommunity = (communityData: Community) => {
    //batch write
    //creating a new community snippet
    //updating the number of members in the community
    try {
    } catch (error) {
      console.log("joinCommunity error", error);
      setError(error.message);
    }
    //update recoil state - communityState.mySnippets (1)
  };
  const leaveCommunity = (communityId: string) => {
    //batch write
    //deleting community snippet
    //updating the number of members in the community (-1)
    //update recoil state - communityState.mySnippets
  };
  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  return {
    //data and function
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommunityData;