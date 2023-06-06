import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface FinanceDataType {
    globalRobotoFont: {
      font: string;
    };
    globalPoppinsFont: {
      font: string;
    };
    topBar: {
      components: {
        logo: {
          content: string;
          style: {
            color: string;
            fontSize: string;
          };
        };
        loginButton: {
          content: string;
          style: {
            color: string;
          };
        };
        registerButton: {
          content: string;
          style: {
            color: string;
          };
        };
      };
      style: {
        backgroundColor: string;
      };
    };
    heroSection: {
      components: {
        heroHeader: {
          content: string;
        };
        heroParagraph: {
          content: string;
        };
      };
      style: {
        backgroundImage: string;
      };
    };
    toggleButtons: {
      activeButtonStyle: {
        backgroundColor: string;
        color: string;
      };
      ButtonStyle: {
        backgroundColor: string;
        color: string;
      };
      firstButtonText: {
        content: string;
      };
      secondButtonText: {
        content: string;
      };
    };
    toggleDiv: {
      components: {
        personal: {
          text: {
            content: string;
          };
        }[];
        business: {
          text: {
            content: string;
          };
        }[];
      };
    };
    section3: {
      components: {
        globalFontStyle: {
          headerStyle: {
            fontSize: string;
            color: string;
          };
          text: {
            fontSize: string;
            color: string;
          };
        };
        personal: {
          header: {
            content: string;
          };
          text: {
            content: string;
          };
          imageSrc: string;
        }[];
        business: {
          header: {
            content: string;
          };
          text: {
            content: string;
          };
          imageSrc: string;
        }[];
      };
      style: {
        backgroundColor: string;
      };
    };
    section4: {
      components: {
        globalFontStyle: {
          headerStyle: {
            fontSize: string;
            color: string;
          };
          text: {
            fontSize: string;
            color: string;
          };
        };
        personal: {
          header: {
            content: string;
          };
          text: {
            content: string;
          };
          imageSrc: string;
        }[];
        business: {
          header: {
            content: string;
          };
          text: {
            content: string;
          };
          imageSrc: string;
        }[];
      };
      style: {
        backgroundColor: string;
      };
    };
    messageSection: {
      image: string;
      style: {
        background: string;
      };
    };
    footer: {
      components: {
        globalFontStyle: {
          headerStyle: {
            fontSize: string;
            color: string;
          };
          textStyle: {
            color: string;
          };
        };
        header: {
          content: string;
        };
        text: {
          content: string;
        };
        p1: {
          content: string;
        };
        p2: {
          content: string;
        };
      };
      style: {
        backgroundColor: string;
      };
    };
}
const initialState: FinanceDataType = {
    globalRobotoFont: {
        font:'roboto'
    },
    globalPoppinsFont: {
        font: 'poppins'
    },
    topBar: {
        components: {
            logo: {
                content: 'LOGO',
                style: {
                    color: '#FC7225',
                    fontSize: '40'
                }
            },
            loginButton: {
                content: 'Login',
                style: {
                    color: '#222222',
                }
            },
            registerButton: {
                content: 'Register',
                style: {
                    color: '#FC7225',
                }
            }
        },
        style: {
            backgroundColor: '#FFFFFF',
        }
    },
    heroSection: {
        components: {
            heroHeader: {
                content: 'Disover Lorem Ipsum',
            },
            heroParagraph: {
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis 
                molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan,
                 risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget 
                 condimentum velit, sit amet feugiat lectus.`,
            }
        },
        style: {
            backgroundImage: ''
        }
    },
    toggleButtons: {
        activeButtonStyle: {
            backgroundColor: '#FC7225',
            color: '#FFFFFF'
        },
        ButtonStyle: {
            backgroundColor: '#FFFFFF',
            color: '#FC7225'
        },
        firstButtonText: {
            content: 'Personal'
        },
        secondButtonText: {
            content: 'Business'
        }
    },
    toggleDiv: {
        components: {
            personal: [
                {
                    text: {
                        content: 'Open an acount'
                    }
                },
                {
                    text: {
                        content: 'Manage your money'
                    }
                }
            ],
            business: [
                {
                    text: {
                        content: 'Reqeust a loan'
                    }
                },
                {
                    text: {
                        content: 'Open an investment account'
                    }
                },
                {
                    text: {
                        content: 'Manage your money'
                    }
                }
            ]
        }
    },
    section3: {
        components: {
            globalFontStyle: {
                headerStyle: {
                    fontSize : '40px',
                    color: '#222222'
                },
                text: {
                    fontSize: '20px',
                    color: '#222222'
                }
            },
            personal: [
                {
                    header: {
                        content: 'Lorem Mountain Blog'
                    },
                    text: {
                        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec 
                        fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. 
                        Maecenas eget condimentum velit, sit amet feugiat lectus.`
                    },
                    imageSrc: ''
                } ],
            business: [
                {
                    header: {
                        content: 'Lorem Mountain Blog'
                    },
                    text: {
                        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus.`
                    },
                    imageSrc: ''
                } ]
        },
        style: {
            backgroundColor: '#FFFFFF'
        }
        },
    section4: {
        components: {
            globalFontStyle: {
                headerStyle: {
                    fontSize : '40px',
                    color: '#222222'
                },
                text: {
                    fontSize: '20px',
                    color: '#222222'
                }
            },
            personal: [
                {
                    header: {
                        content: 'Lorem Mountain Blog'
                    },
                    text: {
                        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus.`
                    },
                    imageSrc: ''
                } ],
                business: [
                {
                    header: {
                        content: 'Lorem Mountain Blog'
                    },
                    text: {
                        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem 
                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                        sit amet feugiat lectus.`
                    },
                    imageSrc: ''
                }]
        },
        style: {
            backgroundColor: '#FFFFFF'
        }
    },
    messageSection: {
        image: '',
        style: {
            background: ''
        }
    },
    footer: {
        components: {
            globalFontStyle: {
                headerStyle: {
                    fontSize : '30px',
                    color: '#FFFFFF'
                },
                textStyle: {
                    color: '#FFFFFF'
                }
            },
            header: {
                content: 'LOGO'
            },
            text: {
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Nulla est purus, ultrices in porttitor
                in, accumsan non quam.`
            },
            p1: {
                content: 'Customer care'
            },
            p2: {
                content: '+233 24 123 4567'
            }
        },
        style: {
            backgroundColor: '#222222',
        }

    }
        
}


const FinanceSlice = createSlice({
    name: 'FinanaceData',
    initialState,
    reducers: {
        setTopBarLogoText: (state, action: PayloadAction<string>) => {
            state.topBar.components.logo.content = action.payload;
        },
        setTopBarLogoFont: (state, action: PayloadAction<string>) => {
            state.topBar.components.logo.style.fontSize = action.payload;
        },
        setTopBarBackgroundColour: (state, action: PayloadAction<string>) => {
            state.topBar.style.backgroundColor = action.payload;
        },
        setTopBarLogoTextColour: (state, action: PayloadAction<string>) => {
            state.topBar.components.logo.style.color = action.payload;
        },
        setTopBarLogoTextFontSize: (state, action: PayloadAction<string>) => {
            state.topBar.components.logo.style.fontSize = action.payload;
        },
        setLoginButtonText: (state, action: PayloadAction<string>) => {
            state.topBar.components.loginButton.content = action.payload
        },
        setLoginButtonColour: (state, action: PayloadAction<string>) => {
            state.topBar.components.loginButton.style.color = action.payload
        },
        setRegisterButtonText: (state, action: PayloadAction<string>) => {
            state.topBar.components.registerButton.content = action.payload
        },
        setRegisterButtonColour: (state, action: PayloadAction<string>) => {
            state.topBar.components.registerButton.style.color = action.payload
        },


        setHeroSectionHeader: (state, action: PayloadAction<string>) => {
            state.heroSection.components.heroHeader.content = action.payload
        },
        setHeroSectionHeaderText: (state, action: PayloadAction<string>) => {
            state.heroSection.components.heroParagraph.content = action.payload
        },
        setHeroSectionImage: (state, action: PayloadAction<string>) => {
            state.heroSection.style.backgroundImage = action.payload
        },


        setFirstHoverButtonText: (state, action: PayloadAction<string>) => {
          state.toggleButtons.firstButtonText.content = action.payload
        },
        setSecondHoverButtonText: (state, action: PayloadAction<string>) => {
          state.toggleButtons.secondButtonText.content = action.payload
        },
        settHoverButtonBackgorundColour: (state, action: PayloadAction<string>) => {
          state.toggleButtons.ButtonStyle.backgroundColor = action.payload
        },
        setHoverButtonColour: (state, action: PayloadAction<string>) => {
          state.toggleButtons.ButtonStyle.color= action.payload
        },
        setHoverButtonActiveColour: (state, action: PayloadAction<string>) => {
          state.toggleButtons.activeButtonStyle.color = action.payload
        },
        setHoverButtonActiveBacgroundColour: (state, action: PayloadAction<string>) => {
          state.toggleButtons.activeButtonStyle.backgroundColor = action.payload
        },
        setToggleComponentText1: (state, action: PayloadAction<string>) => {
            state.toggleDiv.components.personal[0].text.content = action.payload
        },
        setToggleComponentText2: (state, action: PayloadAction<string>) => {
          state.toggleDiv.components.personal[1].text.content = action.payload
        },
        setToggleComponentText3: (state, action: PayloadAction<string>) => {
          state.toggleDiv.components.business[0].text.content = action.payload
        },
        setToggleComponentText4: (state, action: PayloadAction<string>) => {
          state.toggleDiv.components.business[1].text.content = action.payload
        },
        setToggleComponentText5: (state, action: PayloadAction<string>) => {
          state.toggleDiv.components.business[2].text.content = action.payload
        },


        setSection3PersonalHeader: (state, action: PayloadAction<string>) => {
          state.section3.components.personal[0].header.content = action.payload
        },
        setSection3PersonalText: (state, action: PayloadAction<string>) => {
          state.section3.components.personal[0].text.content = action.payload
        },
        setSection3BusinessHeader: (state, action: PayloadAction<string>) => {
          state.section3.components.business[0].header.content = action.payload
        },
        setSection3BusinessText: (state, action: PayloadAction<string>) => {
          state.section3.components.business[0].text.content = action.payload
        },
        setSection3PersonalImage: (state, action: PayloadAction<string>) => {
          state.section3.components.personal[0].imageSrc = action.payload
        },
        setSection3BusinessImage: (state, action: PayloadAction<string>) => {
          state.section3.components.business[0].imageSrc = action.payload
        },


        
        setSection4PersonalHeader: (state, action: PayloadAction<string>) => {
          state.section4.components.personal[0].header.content = action.payload
        },
        setSection4PersonalText: (state, action: PayloadAction<string>) => {
          state.section4.components.personal[0].text.content = action.payload
        },
        setSection4BusinessHeader: (state, action: PayloadAction<string>) => {
          state.section4.components.business[0].header.content = action.payload
        },
        setSection4BusinessText: (state, action: PayloadAction<string>) => {
          state.section4.components.business[0].text.content = action.payload
        },
        setSection4PersonalImage: (state, action: PayloadAction<string>) => {
          state.section4.components.personal[0].imageSrc = action.payload
        },
        setSection4BusinessImage: (state, action: PayloadAction<string>) => {
          state.section4.components.business[0].imageSrc = action.payload
        },


        setSection5Image: (state, action: PayloadAction<string>) => {
          state.messageSection.image = action.payload
        },



        setFooterHeader: (state, action: PayloadAction<string>) => {
          state.footer.components.header.content = action.payload
        },
        setFooterText: (state, action: PayloadAction<string>) => {
          state.footer.components.text.content = action.payload
        },
        setFooterP1: (state, action: PayloadAction<string>) => {
          state.footer.components.p1.content = action.payload
        },
        setFooterP2: (state, action: PayloadAction<string>) => {
          state.footer.components.p2.content = action.payload
        },
    }

});
export const { 
    setTopBarLogoText, 
    setTopBarBackgroundColour, 
    setTopBarLogoTextColour,
    setTopBarLogoTextFontSize,
    setLoginButtonText,
    setLoginButtonColour,
    setRegisterButtonText,
    setRegisterButtonColour,

    setHeroSectionHeader,
    setHeroSectionHeaderText,
    setHeroSectionImage,

    setFirstHoverButtonText,
    setSecondHoverButtonText,
    setHoverButtonActiveBacgroundColour,
    setHoverButtonActiveColour,
    setHoverButtonColour,
    settHoverButtonBackgorundColour,
    setToggleComponentText1,
    setToggleComponentText2,
    setToggleComponentText3,
    setToggleComponentText4,
    setToggleComponentText5,


    setSection3BusinessHeader,
    setSection3BusinessImage,
    setSection3BusinessText,
    setSection3PersonalHeader,
    setSection3PersonalImage,
    setSection3PersonalText,


    setSection4BusinessHeader,
    setSection4BusinessImage,
    setSection4BusinessText,
    setSection4PersonalHeader,
    setSection4PersonalImage,
    setSection4PersonalText,


    setSection5Image,
    

    setFooterP1,
    setFooterHeader,
    setFooterP2,
    setFooterText

} = FinanceSlice.actions;

export default FinanceSlice.reducer;