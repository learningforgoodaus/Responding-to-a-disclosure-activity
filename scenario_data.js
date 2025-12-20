// scenario_data.js
// Expanded content with Inner Monologues, Trust Logic, and 'Soft Fail' paths.

const scenarioData = {
    "start": {
        "progress": 5,
        "avatar": "psychology",
        "monologue": "You notice Sarah has been quiet lately. She’s wearing long sleeves despite the heat and seems jumpy when her phone buzzes.",
        "text": "Sarah: \"Hey... do you have a minute? I just need to get away from my desk for a bit.\"",
        "choices": [
            { "text": "Sure, let's just chat here in the breakroom.", "target": "breakroom_distraction", "trustChange": -10 },
            { "text": "Of course. Let's head to the quiet room down the hall.", "target": "private_room_entry", "trustChange": 10 }
        ]
    },

    // --- Path A: Breakroom (Less Ideal) ---
    "breakroom_distraction": {
        "progress": 15,
        "avatar": "psychology",
        "monologue": "The breakroom is busy. People are laughing and making coffee. You see Sarah glance nervously at the door.",
        "text": "Sarah: \"Oh, it's pretty loud in here. Maybe... never mind. It’s not important.\"",
        "choices": [
            { "text": "\"No, tell me, what's wrong?\"", "target": "public_shutdown", "trustChange": -20 },
            { "text": "\"Actually, it is too loud. Let's go somewhere private.\"", "target": "private_room_entry", "trustChange": 5 }
        ]
    },
    "public_shutdown": {
        "progress": 100,
        "avatar": "psychology",
        "monologue": "She pulls back physically, crossing her arms.",
        "text": "Sarah: \"I have to get back to work. forget I mentioned it.\"",
        "choices": [
            { "text": "Restart Scenario", "target": "start", "isRestart": true }
        ]
    },

    // --- Path B: Private Room (Ideal) ---
    "private_room_entry": {
        "progress": 25,
        "avatar": "psychology",
        "monologue": "You sit down in the small meeting room. It’s quiet. Sarah is twisting a ring on her finger.",
        "text": "Sarah: \"Sorry to bother you. It’s just... things are weird at home. I don't really know what to do.\"",
        "choices": [
            { "text": "\"Is it your partner? You should report him.\"", "target": "premature_solution", "trustChange": -10 },
            { "text": "\"I'm here for you. Take your time.\"", "target": "disclosure_start", "trustChange": 20 }
        ]
    },

    "premature_solution": {
        "progress": 40,
        "avatar": "psychology",
        "monologue": "Sarah winces at the suggestion.",
        "text": "Sarah: \"It's not... I can't just do that. It's complicated. He's not always like this.\"",
        "choices": [
            { "text": "\"I'm sorry, I didn't mean to push. I'm just listening.\"", "target": "disclosure_start", "trustChange": 5 },
            { "text": "\"But if you're unsafe, you have to act.\"", "target": "soft_fail_defer", "trustChange": -15 }
        ]
    },

    "soft_fail_defer": {
        "progress": 100,
        "avatar": "psychology",
        "monologue": "She looks exhausted and checks her watch.",
        "text": "Sarah: \"Look, I better go. Maybe we can talk another time. Thanks anyway.\"",
        "choices": [
            { "text": "Restart Scenario", "target": "start", "isRestart": true }
        ]
    },

    // --- Core Disclosure ---
    "disclosure_start": {
        "progress": 50,
        "avatar": "psychology",
        "monologue": "She takes a deep breath. Your patience seems to reassure her.",
        "text": "Sarah: \"He checked my phone again last night. He got angry because I didn't reply fast enough. He threw my keys across the room... I'm scared to go home tonight.\"",
        "choices": [
            { "text": "\"That sounds terrifying. Are you safe to go home?\"", "target": "safety_planning", "trustChange": 20 },
            { "text": "\"Wow, he sounds crazy!\"", "target": "judgment_barrier", "trustChange": -10 }
        ]
    },

    "judgment_barrier": {
        "progress": 60,
        "avatar": "psychology",
        "monologue": "She looks down, ashamed.",
        "text": "Sarah: \"He's under a lot of stress... maybe I'm overreacting.\"",
        "choices": [
            { "text": "\"No, no one deserves to be scared in their own home. I believe you.\"", "target": "safety_planning", "trustChange": 15 },
            { "text": "\"Yeah, stress does crazy things.\"", "target": "soft_fail_defer", "trustChange": -20 }
        ]
    },

    "safety_planning": {
        "progress": 75,
        "avatar": "psychology",
        "monologue": "She looks you in the eye for the first time.",
        "text": "Sarah: \"I don't think I am safe. But I don't have anywhere to go.\"",
        "choices": [
            { "text": "\"We have an EAP service, and I can help you look up local support services right now.\"", "target": "referral_success", "trustChange": 20 },
            { "text": "\"I'm calling the police right now.\"", "target": "safety_risk_panic", "trustChange": -30 }
        ]
    },

    "safety_risk_panic": {
        "progress": 90,
        "avatar": "psychology",
        "monologue": "Panic flashes across her face.",
        "text": "Sarah: \"No! You can't! He'll find out. Please, don't!\"",
        "choices": [
            { "text": "Restart Scenario", "target": "start", "isRestart": true }
        ]
    },

    "referral_success": {
        "progress": 100,
        "avatar": "psychology",
        "monologue": "",
        "text": "By listening without judgment and validating their experience, you made the survivor feel safe enough to accept help.",
        "choices": []
    }
};
