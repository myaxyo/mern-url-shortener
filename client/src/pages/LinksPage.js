import React, { useCallback, useContext, useEffect, useState } from "react";
import { LinkList } from "../components/LinkList";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";


export const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);
  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link/", "GET", null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    } catch (error) {
      console.log(error);

    }
  }, [token, request])

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks])

  if (loading) {
    return <Loader />
  }
  return <>
    {!loading && links && <LinkList links={links} />}
  </>;
};
