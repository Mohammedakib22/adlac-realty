"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, CircleHelp, MessageCircle, MoveUp, Phone, ShieldCheck, X } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HomePage } from "@/components/pages/home";
import { PropertiesPage, PropertyDetailPage } from "@/components/pages/properties";
import { AboutPage, AgentProfilePage, AgentsPage, ArticlePage, BuyRentPage, ContactPage, InsightsPage, LegalPage, ProjectsPage } from "@/components/pages/marketing";
import { AuthPage, ListingWizard, type Viewer } from "@/components/pages/account";
import { AdminPage, CalculatorPage, ComparePage, DashboardPage, LeadsPage, ProfilePage, RecentlyViewedPage, SavedPage, SettingsPage } from "@/components/pages/workspace";

function readArray<T>(key:string):T[]{if(typeof window==="undefined")return[];try{return JSON.parse(localStorage.getItem(key)??"[]") as T[];}catch{return[];}}
export function SiteApp({route}:{route:string}) {
  const [saved,setSaved]=useState<string[]>([]);const [recent,setRecent]=useState<string[]>([]);const [compared,setCompared]=useState<string[]>([]);const [viewer,setViewer]=useState<Viewer>(null);const [dark,setDark]=useState(false);const[themeMode,setThemeMode]=useState<"system"|"light"|"dark">("system");const [notice,setNotice]=useState("");const [showTop,setShowTop]=useState(false);const reduceMotion=useReducedMotion();
  useEffect(()=>{let active=true;queueMicrotask(()=>{if(!active)return;setSaved(readArray<string>("aldac.saved"));setRecent(readArray<string>("aldac.recent"));setCompared(readArray<string>("aldac.compared"));try{const raw=localStorage.getItem("aldac.user");if(raw)setViewer(JSON.parse(raw) as Viewer);}catch{localStorage.removeItem("aldac.user");}const stored=localStorage.getItem("aldac.theme");setThemeMode(stored==="light"||stored==="dark"?stored:"system");});void fetch("/api/auth/session").then(async response=>{if(!response.ok)return;const result=await response.json() as {user:Viewer};if(active&&result.user){setViewer(result.user);localStorage.setItem("aldac.user",JSON.stringify(result.user));const favoriteResponse=await fetch("/api/favorites");if(favoriteResponse.ok){const favorites=await favoriteResponse.json() as {favorites:string[]};if(active){setSaved(favorites.favorites);localStorage.setItem("aldac.saved",JSON.stringify(favorites.favorites));}}}}).catch(()=>undefined);return()=>{active=false;};},[]);
  useEffect(()=>{document.documentElement.dataset.theme=dark?"dark":"light";},[dark]);
  useEffect(()=>{if(themeMode!=="system")return;const media=window.matchMedia("(prefers-color-scheme: dark)");const handle=()=>setDark(media.matches);handle();media.addEventListener("change",handle);return()=>media.removeEventListener("change",handle);},[themeMode]);
  useEffect(()=>{const onScroll=()=>setShowTop(window.scrollY>680);window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll);},[]);
  useEffect(()=>{if(route==="/search"){const query=new URLSearchParams(window.location.search).get("q");if(query)localStorage.setItem("aldac.recentSearches",JSON.stringify([...new Set([query,...readArray<string>("aldac.recentSearches")])].slice(0,5)));}},[route]);
  const announce=useCallback((message:string)=>{setNotice(message);window.setTimeout(()=>setNotice(""),3800);},[]);
  const onSave=useCallback((id:string)=>{const has=saved.includes(id);const next=has?saved.filter(x=>x!==id):[id,...saved];setSaved(next);localStorage.setItem("aldac.saved",JSON.stringify(next));if(viewer)void fetch("/api/favorites",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({propertyId:id,saved:!has})}).catch(()=>undefined);announce(has?"Removed from your saved homes.":"Kept close. This home is saved.");},[saved,viewer,announce]);
  const onViewed=useCallback((id:string)=>{setRecent(current=>{if(current[0]===id)return current;const next=[id,...current.filter(x=>x!==id)].slice(0,8);localStorage.setItem("aldac.recent",JSON.stringify(next));return next;});},[]);
  const onCompare=useCallback((id:string)=>{setCompared(current=>{if(current.includes(id)){const next=current.filter(x=>x!==id);localStorage.setItem("aldac.compared",JSON.stringify(next));announce("Home removed from your comparison.");return next;}if(current.length>=3){announce("Compare up to three homes at a time.");return current;}const next=[...current,id];localStorage.setItem("aldac.compared",JSON.stringify(next));announce("Added to your home comparison.");return next;});},[announce]);
  const onLogin=useCallback((user:Viewer)=>{setViewer(user);if(user)localStorage.setItem("aldac.user",JSON.stringify(user));},[]);
  const onLogout=useCallback(()=>{localStorage.removeItem("aldac.user");setViewer(null);void fetch("/api/auth/logout",{method:"POST"}).catch(()=>undefined);announce("You’re safely signed out.");},[announce]);
  const onTheme=useCallback(()=>setThemeMode(current=>{const next=current==="system"?"light":current==="light"?"dark":"system";localStorage.setItem("aldac.theme",next);if(next==="system")setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);else setDark(next==="dark");return next;}),[]);
  const records=(key:string)=>readArray<Record<string,unknown>>(key);
  let page:React.ReactNode;
  if(route==="/")page=<HomePage saved={saved} onSave={onSave}/>;
  else if(route==="/properties")page=<PropertiesPage saved={saved} onSave={onSave} compared={compared} onCompare={onCompare}/>;
  else if(route.startsWith("/properties/"))page=<PropertyDetailPage route={route} saved={saved} onSave={onSave} onViewed={onViewed}/>;
  else if(route==="/buy"||route==="/rent")page=<BuyRentPage mode={route==="/rent"?"rent":"buy"} saved={saved} onSave={onSave}/>;
  else if(route==="/projects")page=<ProjectsPage/>;
  else if(route==="/agents")page=<AgentsPage/>;
  else if(route.startsWith("/agents/"))page=<AgentProfilePage route={route} saved={saved} onSave={onSave}/>;
  else if(route==="/about")page=<AboutPage/>;
  else if(route==="/contact")page=<ContactPage/>;
  else if(route==="/insights")page=<InsightsPage/>;
  else if(route.startsWith("/insights/"))page=<ArticlePage route={route}/>;
  else if(route==="/privacy"||route==="/terms")page=<LegalPage mode={route==="/privacy"?"privacy":"terms"}/>;
  else if(["/login","/register","/forgot-password","/reset-password"].includes(route))page=<AuthPage route={route} onLogin={onLogin}/>;
  else if(route==="/list-property")page=<ListingWizard viewer={viewer}/>;
  else if(route==="/dashboard")page=<DashboardPage viewer={viewer} saved={saved} recent={recent} inquiries={records("aldac.inquiries")} visits={records("aldac.visits")} onLogout={onLogout} onLogin={onLogin} compared={compared} onCompare={onCompare} onSave={onSave}/>;
  else if(route==="/saved")page=<SavedPage viewer={viewer} saved={saved} onSave={onSave} recent={recent} inquiries={[]} visits={[]} onLogout={onLogout} onLogin={onLogin} compared={compared} onCompare={onCompare}/>;
  else if(route==="/recently-viewed")page=<RecentlyViewedPage viewer={viewer} recent={recent} saved={saved} onSave={onSave} inquiries={[]} visits={[]} onLogout={onLogout} onLogin={onLogin} compared={compared} onCompare={onCompare}/>;
  else if(route==="/inquiries"||route==="/visits")page=<LeadsPage kind={route==="/visits"?"visits":"inquiries"} entries={records(route==="/visits"?"aldac.visits":"aldac.inquiries")} viewer={viewer} saved={saved} recent={recent} inquiries={[]} visits={[]} onLogout={onLogout} onLogin={onLogin} compared={compared} onCompare={onCompare} onSave={onSave}/>;
  else if(route==="/profile")page=<ProfilePage viewer={viewer} saved={saved} recent={recent} inquiries={[]} visits={[]} onLogout={onLogout} onLogin={onLogin} compared={compared} onCompare={onCompare} onSave={onSave}/>;
  else if(route==="/settings")page=<SettingsPage viewer={viewer} saved={saved} recent={recent} inquiries={[]} visits={[]} onLogout={onLogout} onLogin={onLogin} compared={compared} onCompare={onCompare} onSave={onSave}/>;
  else if(route==="/compare")page=<ComparePage viewer={viewer} saved={saved} recent={recent} inquiries={[]} visits={[]} onLogout={onLogout} onLogin={onLogin} compared={compared} onCompare={onCompare} onSave={onSave}/>;
  else if(route==="/emi-calculator")page=<CalculatorPage/>;
  else if(route==="/admin")page=<AdminPage viewer={viewer} saved={saved} recent={recent} inquiries={[]} visits={[]} onLogout={onLogout} onLogin={onLogin} compared={compared} onCompare={onCompare} onSave={onSave}/>;
  else if(route==="/map"||route==="/search")page=<PropertiesPage saved={saved} onSave={onSave} compared={compared} onCompare={onCompare}/>;
  else page=<PropertiesPage saved={saved} onSave={onSave} compared={compared} onCompare={onCompare}/>;
  return <MotionConfig reducedMotion="user"><div className="site-shell"><SiteHeader key={route} route={route} savedCount={saved.length} dark={dark} themeMode={themeMode} onTheme={onTheme} viewer={viewer}/><div className={route==="/"?"page-content is-home":"page-content"}>{page}</div><SiteFooter/>
    <a className="floating-contact" href="https://wa.me/912240001920" target="_blank" rel="noreferrer" aria-label="Chat with Adlac on WhatsApp"><MessageCircle size={20}/><span>Let’s talk</span></a>{showTop&&<button className="back-to-top" onClick={()=>window.scrollTo({top:0,behavior:reduceMotion?"instant":"smooth"})} aria-label="Back to top"><MoveUp size={18}/></button>}
    {notice&&<motion.div className="toast-message global-toast" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} role="status"><span><Check size={16}/></span>{notice}<button aria-label="Dismiss notification" onClick={()=>setNotice("")}><X size={15}/></button></motion.div>}
    </div></MotionConfig>;
}
