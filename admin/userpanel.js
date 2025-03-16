document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("token")) {
        fetch("https://api.hatch.lol/auth/me", {
            headers: {
                Token: localStorage.getItem("token"),
            },
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    if (data.hatchTeam === true) {
                        document.getElementById("admin").innerHTML = `
                            <div id="adminuser">
                                <div id="adminusername">
                                    han&nbsp;<i class="fa-solid fa-check"></i>&nbsp;<i
                                        class="fa-solid fa-shield-halved"
                                    ></i>
                                </div>
                                <div id="adminuserinfo">
                                    <div class="adminuserinfoitem">
                                        Created: <i>April 16, 2024</i>.
                                    </div>
                                    <div class="adminuserinfoitem">
                                        Email: <i>han@hatch.lol</i>.
                                    </div>
                                    <div class="adminuserinfoitem">
                                        Last Login: <i>February 12, 2024</i>.
                                    </div>
                                </div>
                            </div>
                            <div class="spacer"></div>
                            <div id="adminnotes">
                                <div id="adminnotestitle">Notes</div>
                                <div class="spacer"></div>
                                <div id="adminnotescontent">
                                    Next time this user breaks the rules, ban them.<br /><br /><br />There's
                                    a lot of info here!!
                                </div>
                                <div class="spacer"></div>
                                <div class="adminbutton">Edit</div>
                            </div>
                            <div class="spacer"></div>
                            <div id="adminalts">
                                <div id="adminaltstitle">Alts</div>
                                <div class="spacer"></div>
                                <div id="adminaltscontent">
                                    <div class="alt">
                                        <a href="#null">wannaberose</a>&nbsp;
                                        <div class="accountbanned">(Banned)</div>
                                    </div>
                                    <div class="alt">
                                        <a href="#null">a</a>&nbsp;
                                        <div class="accountenabled">(Enabled)</div>
                                    </div>
                                </div>
                            </div>
                            <div class="spacer"></div>
                            <div id="adminalerts">
                                <div id="adminalertstitle">Alerts</div>
                                <div class="spacer"></div>
                                <div id="adminalertsgiven">
                                    <div class="adminalert">
                                        <div class="adminalerttext">
                                            Please do not insult browsers!
                                        </div>
                                        <div class="adminalertgiven">
                                            Admin: han (February 12, 2025)
                                        </div>
                                    </div>
                                    <div class="spacer"></div>
                                    <div class="adminalert">
                                        <div class="adminalerttext">
                                            Please do not insult browsers!
                                        </div>
                                        <div class="adminalertgiven">
                                            Admin: -gr (February 12, 2025)
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="spacer"></div>
                                    <div class="adminbutton">Send Alert</div>
                                </div>
                            </div>
                            <div class="spacer"></div>
                            <div id="adminbio">
                                <div id="adminbiotitle">Bio</div>
                                <div class="spacer"></div>
                                <div id="adminusersbio">hi im han this is my bio wowie</div>
                                <div class="spacer"></div>
                                <div class="adminbutton">Edit Bio</div>
                            </div>
                            <div class="spacer"></div>
                            <div id="adminpfp">
                                <div id="adminpfptitle">Profile Picture</div>
                                <img
                                    src="https://api.hatch.lol//uploads/pfp/default.png"
                                    id="userspfp"
                                    alt="Profile picture"
                                />
                                <div class="adminbutton">Reset Profile Picture</div>
                            </div>
                            <div class="spacer"></div>
                            <div id="admindisplayname">
                                <div id="admindisplaynametitle">Display Name</div>
                                <div class="spacer"></div>
                                <div id="adminusersdisplayname">han</div>
                                <div class="spacer"></div>
                                <div class="adminbutton">Change Display Name</div>
                            </div>
                            <div class="spacer"></div>
                            <div id="adminroles">
                                <div id="adminrolestitle">Current Roles</div>
                                <div class="spacer"></div>
                                <div id="roleslist">
                                    Hatchling, Roles, Won't, Be, Styled, Just, Separated,
                                    With, Commas
                                </div>
                                <div class="spacer"></div>
                                <div class="adminbutton">Edit Roles</div>
                            </div>
                            <div class="spacer"></div>
                            <div id="adminactions">
                                <div id="adminactionstitle">Administrative Actions</div>
                                <div class="spacer"></div>
                                <div class="adminbutton">Ban</div>
                                <div class="spacer"></div>
                                <div class="adminbutton">
                                    Verify User&nbsp;<i class="fa-solid fa-check"></i>
                                </div>
                                <div class="spacer"></div>
                                <div class="adminbutton">
                                    Change Username&nbsp;<i
                                        class="fa-solid fa-circle-exclamation"
                                    ></i>
                                </div>
                                <div class="spacer"></div>
                                <div class="adminbutton">
                                    Delete&nbsp;<i
                                        class="fa-solid fa-circle-exclamation"
                                    ></i>
                                </div>
                                <div class="spacer"></div>
                                <div class="adminbutton">
                                    Make Hatch Team&nbsp;<i
                                        class="fa-solid fa-circle-exclamation"
                                    ></i>
                                </div>
                                <div class="spacer"></div>
                                <div class="adminbutton">
                                    Toggle Comment Status <i>(Disabled)</i>
                                </div>
                            </div>
                        </div>
                        `;
                        let adminPanelElement =
                            document.getElementById("admin");
                        document.addEventListener("keydown", (event) => {
                            if (event.key === "a") {
                                if (
                                    adminPanelElement.style.display === "none"
                                ) {
                                    adminPanelElement.style.display = "block";
                                    console.log("admin panel opened");
                                } else {
                                    adminPanelElement.style.display = "none";
                                    console.log("admin panel closed");
                                }
                            }
                        });
                    }
                });
            }
        });
    }
});
