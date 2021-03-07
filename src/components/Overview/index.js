import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
//import Button from "components/Button";
import {
  Empty,
  Search,
  Loading,
  SidebarHeader,
  SidebarScroll,
  SidebarBackButton,
  Sidebar,
  Item,
} from "@wfp/ui";
import { NavLink, useParams } from "react-router-dom";
import Page from "components/Page";

import devices from "ducks/devices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import deviceKindLookUp from "helpers/deviceKindLookUp";
import Details from "components/Details";
import Nav from "components/Nav";

const Overview = ({ questions }) => {
  const data = useSelector(devices.selectors.dataArray);
  const [search, setSearch] = useState();

  const [selectedUserId, setSelectedUserId] = useState(null);
  //const [search, setSearch] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("reload");
    dispatch(devices.actions.fetch());
  }, []);

  const searchResults = search
    ? data.filter((e) =>
        e.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    : data;

  return (
    <>
      <Page className={styles.page}>
        <Nav />
        <Sidebar
          active={params.id}
          sidebarMobileHeader={
            <>
              <NavLink to={`/`}>
                <SidebarBackButton>Back</SidebarBackButton>
              </NavLink>
              <div>Detail page</div>
            </>
          }
          sidebar={
            <>
              <SidebarHeader>
                <Search
                  placeHolderText="Type to search user"
                  onChange={(e) => setSearch(e)}
                />
              </SidebarHeader>
              <SidebarScroll>
                {!data || data.length < 1 ? (
                  <Loading />
                ) : searchResults && searchResults.length > 0 ? (
                  <>
                    {searchResults.map((question, i) => {
                      const kind = question.deviceKind.find((e) =>
                        e.__component.startsWith("players.")
                      );

                      const deviceKind = deviceKindLookUp?.[kind?.__component]
                        ? deviceKindLookUp?.[kind?.__component]
                        : deviceKindLookUp.default;
                      return (
                        <NavLink
                          to={`/type/${question.id}`}
                          key={i}
                          className={styles.sidebarLink}
                        >
                          <Item
                            active={question.id === parseInt(params.id)}
                            image={
                              <div className={styles.iconWrapper}>
                                {/*} <FontAwesomeIcon
                                  icon={deviceKind.iconDuo}
                                  className={styles.sidebarImageDuo}
                            />*/}
                                <FontAwesomeIcon
                                  icon={deviceKind.icon}
                                  className={styles.sidebarImage}
                                />
                              </div>
                            }
                            title={question.description}
                            children={
                              kind?.__component
                                ? kind?.__component.split(".")[1]
                                : "no deviceKind"
                            }
                            kind="horizontal"
                            wrapper="sidebar"
                            noImage
                          />
                        </NavLink>
                      );
                    })}
                  </>
                ) : (
                  <Empty title="No results">Please check your search</Empty>
                )}
              </SidebarScroll>
            </>
          }
        >
          <Details />
        </Sidebar>
      </Page>
    </>
  );
};

export default Overview;
