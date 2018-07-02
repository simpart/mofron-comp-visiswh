/**
 * @file   mofron-comp-visiswh/index.js
 * @author simpart
 */
let mf = require('mofron');
let Click = require('mofron-event-click');

/**
 * @class mofron.comp.Visiswh
 * @brief 'visible' function switch component for mofron
 */
mf.comp.Visiswh = class extends mf.Component {
    
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po, p2) {
        try {
            super();
            this.name('Visiswh');
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @param prm : 
     */
    initDomConts (swh, tgt) {
        try {
            super.initDomConts();
            if (undefined !== swh) {
                this.switch(swh);
            }
            if (undefined !== tgt) {
                this.swhTarget(tgt);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    switch (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_swch) ? null : this.m_swch;
            }
            /* setter */
            if (true !== mf.func.isInclude(prm, 'Component')) {
                throw new Error('invalid parameter');
            }
            if (0 === this.child().length) {
                this.addChild(prm);
            } else {
                if (null !== this.switch()) {
                    this.updChild(this.switch(), prm);
                } else {
                    this.addChild(prm, 0);
                }
            }
            this.m_swch = prm;
            prm.addEvent(
                 new Click(
                     (cmp, swh) => {
                         try {
                             let sts = swh.status();
                             swh.status(!sts);
                         } catch (e) {
                             console.error(e.stack);
                             throw e;
                         }
                     },
                     this
                 )
            );
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    swhTarget (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_swhtgt) ? null : this.m_swhtgt;
            }
            /* setter */
            if (undefined === this.m_swhtgt) {
                this.m_swhtgt = new Array();
            }
            
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.swhTarget(prm[pidx]);
                }
            } else if (true !== mf.func.isInclude(prm, 'Component')) {
                throw new Error('invalid parameter');
            }
            this.m_swhtgt.push(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    status (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_swhsts) ? false : this.m_swhsts;
            } 
            /* setter */
            if ('boolean' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            let tgt = this.swhTarget();
            if (null !== tgt) {
                for (let tidx in tgt) {
                    tgt[tidx].visible(prm);
                }
            }
            this.m_swhsts = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.Visiswh;
/* end of file */
